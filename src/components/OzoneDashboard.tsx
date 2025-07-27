import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ReferenceLine } from 'recharts';
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
    },
    {
      name: "Cuarte de Huerva",
      id: "cuarte",
      currentLevel: 68,
      status: "good",
      coordinates: [41.6100, -0.9500]
    }
  ],
  
  // Datos históricos de las últimas 24 horas (μg/m³)
  hourlyData: [
    { time: "00:00", centro: 65, casablanca: 58, cuarte: 55 },
    { time: "01:00", centro: 62, casablanca: 55, cuarte: 52 },
    { time: "02:00", centro: 60, casablanca: 53, cuarte: 50 },
    { time: "03:00", centro: 58, casablanca: 51, cuarte: 48 },
    { time: "04:00", centro: 55, casablanca: 48, cuarte: 45 },
    { time: "05:00", centro: 53, casablanca: 47, cuarte: 44 },
    { time: "06:00", centro: 58, casablanca: 52, cuarte: 49 },
    { time: "07:00", centro: 68, casablanca: 61, cuarte: 58 },
    { time: "08:00", centro: 75, casablanca: 68, cuarte: 65 },
    { time: "09:00", centro: 82, casablanca: 74, cuarte: 71 },
    { time: "10:00", centro: 88, casablanca: 79, cuarte: 76 },
    { time: "11:00", centro: 92, casablanca: 83, cuarte: 80 },
    { time: "12:00", centro: 95, casablanca: 86, cuarte: 83 },
    { time: "13:00", centro: 98, casablanca: 89, cuarte: 86 },
    { time: "14:00", centro: 102, casablanca: 92, cuarte: 89 },
    { time: "15:00", centro: 105, casablanca: 95, cuarte: 92 },
    { time: "16:00", centro: 108, casablanca: 98, cuarte: 95 },
    { time: "17:00", centro: 95, casablanca: 88, cuarte: 85 },
    { time: "18:00", centro: 89, casablanca: 82, cuarte: 79 },
    { time: "19:00", centro: 86, casablanca: 79, cuarte: 76 },
    { time: "20:00", centro: 83, casablanca: 76, cuarte: 73 },
    { time: "21:00", centro: 78, casablanca: 71, cuarte: 68 },
    { time: "22:00", centro: 73, casablanca: 67, cuarte: 64 },
    { time: "23:00", centro: 68, casablanca: 62, cuarte: 59 }
  ],

  // Promedios semanales
  weeklyAverages: [
    { day: "Lun", centro: 78, casablanca: 72, cuarte: 69 },
    { day: "Mar", centro: 82, casablanca: 75, cuarte: 72 },
    { day: "Mié", centro: 85, casablanca: 78, cuarte: 75 },
    { day: "Jue", centro: 88, casablanca: 81, cuarte: 78 },
    { day: "Vie", centro: 91, casablanca: 84, cuarte: 81 },
    { day: "Sáb", centro: 75, casablanca: 68, cuarte: 65 },
    { day: "Dom", centro: 69, casablanca: 63, cuarte: 60 }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  labelStyle={{ color: '#000' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => {
                    const color = name === 'cuarte' ? '#16a34a' : '#000000'; // Verde oscuro para Cuarte, negro para otros
                    const label = name === 'centro' ? 'Centro:' : 
                                 name === 'casablanca' ? 'Casablanca:' : 'Cuarte:';
                    return [
                      <span style={{ color }}>{`${value} μg/m³`}</span>, 
                      <span style={{ color }}>{label}</span>
                    ];
                  }}
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
                  stroke="hsl(var(--casablanca-color))" 
                  fill="hsl(var(--casablanca-color))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                 <Area 
                  type="monotone" 
                  dataKey="cuarte" 
                  stackId="3"
                  stroke="hsl(var(--cuarte-color))" 
                  fill="hsl(var(--cuarte-color))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <ReferenceLine 
                  y={80} 
                  stroke="hsl(var(--air-good))" 
                  strokeWidth={3}
                  strokeDasharray="none"
                  label={{ value: "Nivel Óptimo (80 μg/m³)", position: "top", fontSize: 12 }}
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
                  labelStyle={{ color: '#000' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => {
                    const color = name === 'cuarte' ? '#16a34a' : '#000000'; // Verde oscuro para Cuarte, negro para otros
                    const label = name === 'centro' ? 'Centro:' : 
                                 name === 'casablanca' ? 'Casablanca:' : 'Cuarte:';
                    return [
                      <span style={{ color }}>{`${value} μg/m³`}</span>, 
                      <span style={{ color }}>{label}</span>
                    ];
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
                  fill="hsl(var(--casablanca-color))" 
                  name="Casablanca"
                  radius={4}
                />
                 <Bar 
                  dataKey="cuarte" 
                  fill="hsl(var(--cuarte-color))" 
                  name="Cuarte de Huerva"
                  radius={4}
                />
                <ReferenceLine 
                  y={80} 
                  stroke="hsl(var(--air-good))" 
                  strokeWidth={3}
                  strokeDasharray="none"
                  label={{ value: "Nivel Óptimo", position: "top", fontSize: 12 }}
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