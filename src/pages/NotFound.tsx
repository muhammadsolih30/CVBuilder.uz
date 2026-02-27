import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404: Sahifa topilmadi:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <FileText className="w-10 h-10 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-6xl font-extrabold text-foreground mb-3">404</h1>
          <p className="text-xl text-muted-foreground mb-2">Sahifa topilmadi</p>
          <p className="text-sm text-muted-foreground">
            Siz qidirayotgan sahifa mavjud emas yoki o'chirilgan.
          </p>
        </div>
        <Button
          onClick={() => navigate("/")}
          className="gradient-primary text-primary-foreground"
          size="lg"
        >
          <Home className="w-4 h-4 mr-2" />
          Bosh sahifaga qaytish
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
