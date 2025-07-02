import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import DrawingCanvas from "@/components/DrawingCanvas";

const Index = () => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const games = [
    {
      id: "drawing",
      title: "Рисовалка",
      description: "Создавай удивительные рисунки на интерактивном холсте",
      icon: "Paintbrush2",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "puzzle",
      title: "Пазлы",
      description: "Собирай пазлы разной сложности",
      icon: "Puzzle",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "memory",
      title: "Память",
      description: "Тренируй память с карточками",
      icon: "Brain",
      color: "from-green-500 to-emerald-500",
    },
  ];

  if (currentGame === "drawing") {
    return <DrawingCanvas onBack={() => setCurrentGame(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Icon name="Gamepad2" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-rubik">
                  GameHub
                </h1>
                <p className="text-purple-200 text-sm">Игровой портал</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button
                variant="ghost"
                className="text-white hover:text-purple-200"
              >
                Главная
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-purple-200"
              >
                Каталог игр
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-purple-200"
              >
                Галерея
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-purple-200"
              >
                Сообщество
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 font-rubik">
            Добро пожаловать в
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Мир Игр
            </span>
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Играй, создавай, делись с друзьями! Коллекция браузерных игр для
            всех возрастов.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Card
              key={game.id}
              className="bg-black/30 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${game.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon
                    name={game.icon as any}
                    size={32}
                    className="text-white"
                  />
                </div>
                <CardTitle className="text-white text-xl font-rubik">
                  {game.title}
                </CardTitle>
                <CardDescription className="text-purple-200">
                  {game.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setCurrentGame(game.id)}
                  className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white font-semibold`}
                  disabled={game.id !== "drawing"}
                >
                  {game.id === "drawing" ? "Играть" : "Скоро"}
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">1000+</div>
            <div className="text-purple-200">Игроков</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-purple-200">Игр</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">10k+</div>
            <div className="text-purple-200">Рисунков</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-purple-200">Онлайн</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
