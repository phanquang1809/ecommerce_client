import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full shadow-none border-0">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-3xl font-bold">404</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-2 pb-6">
          <h2 className="text-xl font-semibold">Không tìm thấy trang</h2>
          <p className="text-muted-foreground">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button size="lg" onClick={() => navigate(-1)} className="flex items-center gap-2 dark:!bg-white">
            <ArrowLeft className="size-5" />
            Quay lại
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
