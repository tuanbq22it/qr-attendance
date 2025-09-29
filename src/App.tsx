import { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader, Result, NotFoundException } from '@zxing/library';
import './App.css';

interface AttendanceRecord {
  mssv: string;
  timestamp: Date;
}

function App() {
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    const codeReader = codeReaderRef.current;
    let stream: MediaStream | null = null;

    const startScan = async () => {
      if (!videoRef.current) return;

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        videoRef.current.srcObject = stream;

        // Bắt đầu quét liên tục từ stream video
        await codeReader.decodeFromStream(stream, videoRef.current, (result, err) => {
          // Chỉ xử lý khi đang trong trạng thái quét
          if (isScanning) {
            if (result) {
              handleScanResult(result);
            }
            // Bỏ qua lỗi NotFoundException vì nó xảy ra liên tục khi không tìm thấy mã QR
            if (err && !(err instanceof NotFoundException)) {
              console.error("Lỗi quét mã:", err);
            }
          }
        });

      } catch (err) {
        console.error("Không thể truy cập camera:", err);
        alert("Không thể truy cập camera. Vui lòng cấp quyền và đảm bảo bạn đang sử dụng kết nối HTTPS.");
        setIsScanning(false);
      }
    };

    if (isScanning) {
      startScan();
    }

    // Hàm dọn dẹp
    return () => {
      codeReader.reset();
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isScanning]); // Phụ thuộc vào isScanning để bắt đầu và dọn dẹp

  const handleScanResult = (result: Result) => {
    const text = result.getText();
    const prefix = "ATTEND:";
    if (text.startsWith(prefix)) {
      const mssv = text.substring(prefix.length);
      if (mssv) {
        if (!attendanceList.some(record => record.mssv === mssv)) {
          const newRecord: AttendanceRecord = { mssv, timestamp: new Date() };
          setAttendanceList(prevList => [...prevList, newRecord]);
          alert(`Đã điểm danh thành công cho MSSV: ${mssv}`);
        } else {
          alert(`MSSV ${mssv} đã được điểm danh trước đó.`);
        }
        setIsScanning(false); // Tự động dừng quét
      }
    } else {
      alert(`Mã QR không hợp lệ. Định dạng yêu cầu: "ATTEND:<MSSV>"`);
    }
  };

  const exportToCSV = () => {
    const headers = ["MSSV", "Thời gian"];
    const rows = attendanceList.map(record => 
      `"${record.mssv}","${record.timestamp.toLocaleString('vi-VN')}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lich_su_diem_danh.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAttendance = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử điểm danh không?")) {
      setAttendanceList([]);
    }
  };

  return (
    <div className="App">
      <h1>Hệ thống Điểm danh bằng QR Code</h1>
      
      <div className="controls">
        <button onClick={() => setIsScanning(prev => !prev)}>
          {isScanning ? 'Dừng Quét' : 'Bắt đầu Quét'}
        </button>
        <button onClick={resetAttendance} disabled={attendanceList.length === 0}>
          Reset Danh sách
        </button>
        <button onClick={exportToCSV} disabled={attendanceList.length === 0}>
          Xuất ra CSV
        </button>
      </div>

      {isScanning && (
        <div className="scanner-container">
          <video ref={videoRef} style={{ width: '100%', maxWidth: '500px' }} autoPlay playsInline />
          <p>Đưa mã QR vào trong khung hình...</p>
        </div>
      )}

      <div className="history">
        <h2>Lịch sử Điểm danh</h2>
        {attendanceList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>MSSV</th>
                <th>Thời gian Quét</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((record, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{record.mssv}</td>
                  <td>{record.timestamp.toLocaleString('vi-VN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Chưa có dữ liệu điểm danh.</p>
        )}
      </div>
    </div>
  );
}

export default App;
