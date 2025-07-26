import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Target, Users, Award } from "lucide-react";

// Datos simulados de la encuesta
const surveyData = {
  user: {
    name: "María González",
    totalScore: 85,
    responses: [
      { category: "Comunicación", score: 90, average: 78 },
      { category: "Liderazgo", score: 82, average: 75 },
      { category: "Trabajo en Equipo", score: 88, average: 82 },
      { category: "Innovación", score: 79, average: 71 },
      { category: "Adaptabilidad", score: 86, average: 80 }
    ]
  },
  groupStats: {
    totalParticipants: 147,
    averageScore: 77,
    completionRate: 94
  }
};

const COLORS = ['hsl(217, 89%, 61%)', 'hsl(142, 69%, 58%)', 'hsl(45, 93%, 58%)', 'hsl(0, 84%, 60%)', 'hsl(280, 50%, 60%)'];

export default function SurveyDashboard() {
  const radarData = surveyData.user.responses.map(item => ({
    category: item.category,
    userScore: item.score,
    groupAverage: item.average
  }));

  const performanceData = surveyData.user.responses.map((item, index) => ({
    name: item.category,
    value: item.score,
    color: COLORS[index]
  }));

  const comparisonData = surveyData.user.responses.map(item => ({
    category: item.category.slice(0, 8) + '...',
    tuPuntuacion: item.score,
    promedioGrupo: item.average
  }));

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="bg-gradient-hero text-white rounded-2xl p-8 shadow-elevation">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Resultados de Evaluación
            </h1>
            <p className="text-blue-100 text-lg">
              Panel personal de {surveyData.user.name}
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Tu Puntuación</p>
                  <p className="text-3xl font-bold text-primary">{surveyData.user.totalScore}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-success mr-1" />
                <span className="text-sm text-success">+8 puntos vs promedio</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Promedio Grupal</p>
                  <p className="text-3xl font-bold text-muted-foreground">{surveyData.groupStats.averageScore}</p>
                </div>
                <div className="bg-muted p-3 rounded-full">
                  <Users className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <Target className="h-4 w-4 text-primary mr-1" />
                <span className="text-sm text-muted-foreground">{surveyData.groupStats.totalParticipants} participantes</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Tu Ranking</p>
                  <p className="text-3xl font-bold text-accent">Top 25%</p>
                </div>
                <div className="bg-accent/10 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
              </div>
              <Badge variant="secondary" className="mt-2 bg-success/10 text-success border-success/20">
                Excelente desempeño
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Comparison Chart */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="text-primary">Comparación por Categoría</CardTitle>
              <CardDescription>Tu puntuación vs. promedio del grupo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="tuPuntuacion" fill="hsl(var(--primary))" name="Tu Puntuación" radius={4} />
                  <Bar dataKey="promedioGrupo" fill="hsl(var(--muted-foreground))" name="Promedio Grupo" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="text-primary">Perfil de Competencias</CardTitle>
              <CardDescription>Análisis comparativo detallado</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} />
                  <Radar 
                    name="Tu Puntuación" 
                    dataKey="userScore" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Radar 
                    name="Promedio Grupo" 
                    dataKey="groupAverage" 
                    stroke="hsl(var(--muted-foreground))" 
                    fill="hsl(var(--muted-foreground))" 
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Scores */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="text-primary">Resultados Detallados por Categoría</CardTitle>
            <CardDescription>Progreso individual y comparación con el grupo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {surveyData.user.responses.map((item, index) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{item.category}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        Promedio: {item.average}
                      </span>
                      <Badge 
                        variant={item.score > item.average ? "default" : "secondary"}
                        className={item.score > item.average ? "bg-success text-success-foreground" : ""}
                      >
                        {item.score}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Progress value={item.score} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </div>
                  {item.score > item.average && (
                    <p className="text-sm text-success flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{item.score - item.average} puntos sobre el promedio
                    </p>
                  )}
                  {item.score < item.average && (
                    <p className="text-sm text-warning flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      -{item.average - item.score} puntos bajo el promedio
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}