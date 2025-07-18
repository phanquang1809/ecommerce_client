import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';

export const CheckoutPayment = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const amount = query.get('amount') || "0";
  const orderId = query.get('orderId') || "unknown";

  const [timeLeft, setTimeLeft] = useState({ minutes: 9, seconds: 48 });
  const qrCodeImage = `https://qr.sepay.vn/img?acc=VQRQADJJN1426&bank=MBBank&amount=${amount}&des=${orderId}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Side - Order Info */}
          <Card className="p-6 bg-white shadow-none">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Thông tin đơn hàng</h2>

              <div className="space-y-2">
                <div className="text-sm text-gray-500">Mã đơn hàng</div>
                <div className="font-mono text-lg font-semibold">{orderId}</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-500">Mô tả</div>
                <div className="text-gray-800">Thanh toán hóa đơn {orderId}</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-500">Số tiền</div>
                <div className="text-2xl font-bold text-gray-800">{Number(amount).toLocaleString()}đ</div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-blue-600 font-medium">Đơn hàng sẽ hết hạn sau:</div>
                <div className="flex gap-2">
                  <div className="bg-blue-100 rounded-lg px-4 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-bold text-blue-600">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-blue-600">Phút</div>
                  </div>
                  <div className="bg-blue-100 rounded-lg px-4 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-bold text-blue-600">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-blue-600">Giây</div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-8" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay về
              </Button>
            </div>
          </Card>

          {/* Right Side - QR Code */}
          <Card className="p-6 bg-blue-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}
            />
            <div className="relative z-10 text-white space-y-6">
              <h2 className="text-xl font-semibold text-center">Quét mã QR để thanh toán</h2>
              <div className="flex justify-center">
                <div className="bg-white p-6 rounded-2xl animate-qr-pulse">
                   <div className="relative overflow-hidden">
                    <img src={qrCodeImage} alt="QR Code" className="w-64 h-64 object-contain" />
                    <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent animate-qr-scan"></div>
                    </div>
                    {/* Brackets */}
                    {["top-0 left-0 rounded-tl-lg border-t-4 border-l-4",
                      "top-0 right-0 rounded-tr-lg border-t-4 border-r-4",
                      "bottom-0 left-0 rounded-bl-lg border-b-4 border-l-4",
                      "bottom-0 right-0 rounded-br-lg border-b-4 border-r-4"
                    ].map((pos, i) => (
                      <div key={i} className={`absolute w-8 h-8 border-blue-600 ${pos}`}></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded"></div>
                  </div>
                  <span>Sử dụng ứng dụng ngân hàng để quét mã</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm">
                  Gặp khó khăn khi thanh toán?{' '}
                  <button className="underline font-medium hover:no-underline">
                    Xem Hướng dẫn
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
