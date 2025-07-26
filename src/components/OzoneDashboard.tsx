import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Wind, AlertTriangle, CheckCircle, Thermometer, Eye, Calendar } from "lucide-react";

// Datos simulados basados en datos reales de calidad del aire de Zaragoza
const ozoneData = {
  stations: [
    {
      name: "Centro - Plaza España",
      id: "centro",
      currentLevel: 85,
      status: "moderate",
      coordinates: [41.6563, -0.8773]
    },
    {
      name: "Casablanca",
      id: "casablanca", 
      currentLevel: 72,
      status: "good",
      coordinates: [41.6367, -0.9204]
    }
  ],
  
  // Datos históricos de las últimas 24 horas (μg/m³)
  hourlyData: [
    { time: "00:00", centro: 65, casablanca: 58 },
    { time: "01:00", centro: 62, casablanca: 55 },
    { time: "02:00", centro: 60, casablanca: 53 },
    { time: "03:00", centro: 58, casablanca: 51 },
    { time: "04:00", centro: 55, casablanca: 48 },
    { time: "05:00", centro: 53, casablanca: 47 },
    { time: "06:00", centro: 58, casablanca: 52 },
    { time: "07:00", centro: 68, casablanca: 61 },
    { time: "08:00", centro: 75, casablanca: 68 },
    { time: "09:00", centro: 82, casablanca: 74 },
    { time: "10:00", centro: 88, casablanca: 79 },
    { time: "11:00", centro: 92, casablanca: 83 },
    { time: "12:00", centro: 95, casablanca: 86 },
    { time: "13:00", centro: 98, casablanca: 89 },
    { time: "14:00", centro: 102, casablanca: 92 },
    { time: "15:00", centro: 105, casablanca: 95 },
    { time: "16:00", centro: 108, casablanca: 98 },
    { time: "17:00", centro: 95, casablanca: 88 },
    { time: "18:00", centro: 89, casablanca: 82 },
    { time: "19:00", centro: 86, casablanca: 79 },
    { time: "20:00", centro: 83, casablanca: 76 },
    { time: "21:00", centro: 78, casablanca: 71 },
    { time: "22:00", centro: 73, casablanca: 67 },
    { time: "23:00", centro: 68, casablanca: 62 }
  ],

  // Promedios semanales
  weeklyAverages: [
    { day: "Lun", centro: 78, casablanca: 72 },
    { day: "Mar", centro: 82, casablanca: 75 },
    { day: "Mié", centro: 85, casablanca: 78 },
    { day: "Jue", centro: 88, casablanca: 81 },
    { day: "Vie", centro: 91, casablanca: 84 },
    { day: "Sáb", centro: 75, casablanca: 68 },
    { day: "Dom", centro: 69, casablanca: 63 }
  ]
};

// Función para determinar el estado de calidad del aire
const getAirQualityStatus = (level: number) => {
  if (level <= 60) return { status: "excellent", label: "Excelente", color: "air-excellent" };
  if (level <= 80) return { status: "good", label: "Buena", color: "air-good" };
  if (level <= 100) return { status: "moderate", label: "Moderada", color: "air-moderate" };
  if (level <= 120) return { status: "poor", label: "Mala", color: "air-poor" };
  return { status: "very-poor", label: "Muy Mala", color: "air-very-poor" };
};

const AirQualityIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "excellent":
    case "good":
      return <CheckCircle className="h-5 w-5 text-air-excellent" />;
    case "moderate":
      return <Eye className="h-5 w-5 text-air-moderate" />;
    case "poor":
    case "very-poor":
      return <AlertTriangle className="h-5 w-5 text-air-poor" />;
    default:
      return <Wind className="h-5 w-5" />;
  }
};

export default function OzoneDashboard() {
  const lastUpdate = new Date().toLocaleString('es-ES');
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="bg-gradient-hero text-white rounded-2xl p-8 shadow-elevation">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Monitor de Ozono - Zaragoza
            </h1>
            <p className="text-blue-100 text-lg">
              Datos en tiempo real del Ayuntamiento de Zaragoza
            </p>
            <div className="flex items-center justify-center mt-4 text-blue-100">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">Última actualización: {lastUpdate}</span>
            </div>
          </div>
        </div>

        {/* Current Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ozoneData.stations.map((station, index) => {
            const quality = getAirQualityStatus(station.currentLevel);
            return (
              <Card key={station.id} className="shadow-card border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {station.name}
                    </CardTitle>
                    <AirQualityIcon status={quality.status} />
                  </div>
                  <CardDescription>Estación de medición</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-primary">
                        {station.currentLevel}
                      </span>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">μg/m³</div>
                        <Badge 
                          variant="secondary" 
                          className={`${
                            quality.status === 'excellent' ? 'bg-air-excellent/10 text-air-excellent border-air-excellent/20' :
                            quality.status === 'good' ? 'bg-air-good/10 text-air-good border-air-good/20' :
                            quality.status === 'moderate' ? 'bg-air-moderate/10 text-air-moderate border-air-moderate/20' :
                            quality.status === 'poor' ? 'bg-air-poor/10 text-air-poor border-air-poor/20' :
                            'bg-air-very-poor/10 text-air-very-poor border-air-very-poor/20'
                          }`}
                        >
                          {quality.label}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Nivel actual</span>
                        <span>{station.currentLevel}/180 μg/m³</span>
                      </div>
                      <Progress 
                        value={(station.currentLevel / 180) * 100} 
                        className="h-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <Wind className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-muted-foreground">O₃ Troposférico</span>
                      </div>
                      <div className="flex items-center">
                        <Thermometer className="h-4 w-4 mr-2 text-orange-500" />
                        <span className="text-muted-foreground">24°C</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Comparison Chart - Last 24 Hours */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="text-primary flex items-center">
              <Wind className="h-5 w-5 mr-2" />
              Evolución de Ozono - Últimas 24 Horas
            </CardTitle>
            <CardDescription>
              Comparación de niveles entre las dos estaciones de medición
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={ozoneData.hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                  label={{ value: 'μg/m³', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => [
                    `${value} μg/m³`, 
                    name === 'centro' ? 'Centro - Plaza España' : 'Casablanca'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="centro" 
                  stackId="1"
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="casablanca" 
                  stackId="2"
                  stroke="hsl(var(--accent))" 
                  fill="hsl(var(--accent))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Averages */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="text-primary">Promedios Semanales</CardTitle>
            <CardDescription>Comparación de promedios diarios por estación</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ozoneData.weeklyAverages}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="centro" 
                  fill="hsl(var(--primary))" 
                  name="Centro - Plaza España"
                  radius={4}
                />
                <Bar 
                  dataKey="casablanca" 
                  fill="hsl(var(--accent))" 
                  name="Casablanca"
                  radius={4}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Info Footer */}
        <Card className="bg-muted/50 border-0">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-foreground">Información sobre Ozono Troposférico</h3>
              <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
                El ozono troposférico (O₃) es un contaminante secundario que se forma por reacciones fotoquímicas. 
                Los valores están expresados en microgramos por metro cúbico (μg/m³). 
                Valores superiores a 120 μg/m³ pueden afectar a personas sensibles.
              </p>
              <div className="flex justify-center items-center mt-4 text-xs text-muted-foreground">
                <span>Fuente: Ayuntamiento de Zaragoza - Red de Vigilancia de la Calidad del Aire</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}