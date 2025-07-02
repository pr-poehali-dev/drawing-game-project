import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Icon from "@/components/ui/icon";

interface DrawingCanvasProps {
  onBack: () => void;
}

type Tool = "brush" | "eraser";

const DrawingCanvas = ({ onBack }: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<Tool>("brush");
  const [brushSize, setBrushSize] = useState(5);
  const [currentColor, setCurrentColor] = useState("#8B5CF6");
  const [savedDrawings, setSavedDrawings] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colors = [
    "#8B5CF6",
    "#D946EF",
    "#0EA5E9",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5A2B",
    "#6B7280",
    "#000000",
    "#FFFFFF",
    "#FCD34D",
    "#A78BFA",
    "#34D399",
    "#F87171",
    "#60A5FA",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Set white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load saved drawings from localStorage
    const saved = localStorage.getItem("drawings");
    if (saved) {
      setSavedDrawings(JSON.parse(saved));
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";

    if (currentTool === "brush") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = currentColor;
    } else {
      ctx.globalCompositeOperation = "destination-out";
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const fillCanvas = (color: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setShowColorPicker(false);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataURL = canvas.toDataURL();
    const newDrawings = [...savedDrawings, dataURL];
    setSavedDrawings(newDrawings);
    localStorage.setItem("drawings", JSON.stringify(newDrawings));
  };

  const loadDrawing = (dataURL: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = dataURL;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="text-white border-white/20"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-3xl font-bold text-white font-rubik">
            Рисовалка
          </h1>
          <div className="w-20"></div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Tools Panel */}
          <Card className="bg-black/30 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Инструменты</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tool Selection */}
              <div>
                <h3 className="text-white mb-3">Инструмент</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={currentTool === "brush" ? "default" : "outline"}
                    onClick={() => setCurrentTool("brush")}
                    className={
                      currentTool === "brush"
                        ? "bg-purple-500"
                        : "border-white/20 text-white"
                    }
                  >
                    <Icon name="Paintbrush" size={16} className="mr-2" />
                    Кисть
                  </Button>
                  <Button
                    variant={currentTool === "eraser" ? "default" : "outline"}
                    onClick={() => setCurrentTool("eraser")}
                    className={
                      currentTool === "eraser"
                        ? "bg-purple-500"
                        : "border-white/20 text-white"
                    }
                  >
                    <Icon name="Eraser" size={16} className="mr-2" />
                    Ластик
                  </Button>
                </div>
              </div>

              {/* Brush Size */}
              <div>
                <h3 className="text-white mb-3">Размер: {brushSize}px</h3>
                <Slider
                  value={[brushSize]}
                  onValueChange={(value) => setBrushSize(value[0])}
                  min={1}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-white mb-3">Цвет</h3>
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setCurrentColor(color)}
                      className={`w-8 h-8 rounded-lg border-2 ${
                        currentColor === color
                          ? "border-white"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Canvas Actions */}
              <div className="space-y-2">
                <Dialog
                  open={showColorPicker}
                  onOpenChange={setShowColorPicker}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                      <Icon name="Palette" size={16} className="mr-2" />
                      Заполнить холст
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black/90 border-white/20">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        Выберите цвет для заливки
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-5 gap-3">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => fillCanvas(color)}
                          className="w-12 h-12 rounded-lg border-2 border-white/20 hover:border-white"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Icon name="Trash2" size={16} className="mr-2" />
                      Стереть весь холст
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-black/90 border-white/20">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">
                        Вы уверены что хотите очистить весь холст?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-purple-200">
                        Это действие нельзя отменить. Весь рисунок будет удален.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-white/20 text-white">
                        Отмена
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={clearCanvas}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Да
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  onClick={saveDrawing}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                >
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить в галерею
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Canvas */}
          <div className="lg:col-span-2">
            <Card className="bg-black/30 backdrop-blur-sm border-white/10">
              <CardContent className="p-4">
                <canvas
                  ref={canvasRef}
                  className="border border-white/20 rounded-lg cursor-crosshair bg-white"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Gallery */}
          <Card className="bg-black/30 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Icon name="Images" size={20} className="mr-2" />
                Галерея
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {savedDrawings.length === 0 ? (
                  <p className="text-purple-200 text-sm">
                    Сохраненных рисунков пока нет
                  </p>
                ) : (
                  savedDrawings.map((drawing, index) => (
                    <button
                      key={index}
                      onClick={() => loadDrawing(drawing)}
                      className="w-full border border-white/20 rounded-lg overflow-hidden hover:border-white/40 transition-colors"
                    >
                      <img
                        src={drawing}
                        alt={`Рисунок ${index + 1}`}
                        className="w-full h-16 object-cover"
                      />
                    </button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
