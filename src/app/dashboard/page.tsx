"use client"

import { useState, useMemo } from "react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWeekend } from "date-fns"
import { CalendarIcon, InfoIcon, DownloadIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { TooltipProvider } from "@/components/ui/tooltip"

const attendanceData = [
  {
    id: 1,
    date: "2025-02-04",
    class: "CS301 - Software Engineering",
    status: "Present",
    time: "11:00 AM",
  },
  {
    id: 2,
    date: "2025-02-05",
    class: "CS301 - Software Engineering",
    status: "Absent",
    time: "11:00 AM",
  },
  {
    id: 3,
    date: "2025-02-11",
    class: "CS301 - Software Engineering",
    status: "Present",
    time: "11:00 AM",
  }
]

const allClasses = [
  "CS301 - Software Engineering",
]

export default function DashboardPage() {
  const { user } = useUser()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showAllData, setShowAllData] = useState(false)
  const [selectedClass, setSelectedClass] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const { overallStats, classStats, monthlyOverview } = useMemo(() => {
    const totalClasses = attendanceData.length
    const presentClasses = attendanceData.filter(record => record.status === "Present").length
    const classStats = allClasses.map(className => {
      const classRecords = attendanceData.filter(record => record.class === className)
      const present = classRecords.filter(record => record.status === "Present").length
      return {
        className,
        total: classRecords.length,
        present,
        percentage: (classRecords.length > 0) ? (present / classRecords.length) * 100 : 0
      }
    })

    const monthStart = startOfMonth(date || new Date())
    const monthEnd = endOfMonth(date || new Date())
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
    
    const monthlyOverview = daysInMonth.map(day => {
      const formattedDate = format(day, 'yyyy-MM-dd')
      const records = attendanceData.filter(record => record.date === formattedDate)
      return {
        date: day,
        present: records.filter(r => r.status === 'Present').length,
        absent: records.filter(r => r.status === 'Absent').length,
        isWeekend: isWeekend(day)
      }
    })

    return {
      overallStats: {
        total: totalClasses,
        present: presentClasses,
        percentage: (totalClasses > 0) ? (presentClasses / totalClasses) * 100 : 0
      },
      classStats,
      monthlyOverview
    }
  }, [date])

  const classesToDisplay = useMemo(() => {
    const monthDates = eachDayOfInterval({ start: startOfMonth(date || new Date()), end: endOfMonth(date || new Date()) });
    if (showAllData) {
      return monthDates.map((day) => {
        const formattedDate = format(day, "yyyy-MM-dd")
        if (isWeekend(day)) {
          return {
            date: formattedDate,
            classes: [{ class: "Weekend", status: "Holiday", time: "-" }],
          }
        }
        const classesOnDate = attendanceData.filter((record) => record.date === formattedDate)
        return {
          date: formattedDate,
          classes: allClasses.map((className) => {
            const classRecord = classesOnDate.find((record) => record.class === className)
            return (
              classRecord || {
                class: className,
                status: "No Class",
                time: "-",
              }
            )
          }),
        }
      })
    } else if (date) {
      const formattedDate = format(date, "yyyy-MM-dd")
      if (isWeekend(date)) {
        return [
          {
            date: formattedDate,
            classes: [{ class: "Weekend", status: "Holiday", time: "-" }],
          },
        ]
      }
      const classesOnDate = attendanceData.filter((record) => record.date === formattedDate)
      return [
        {
          date: formattedDate,
          classes: allClasses.map((className) => {
            const classRecord = classesOnDate.find((record) => record.class === className)
            return (
              classRecord || {
                class: className,
                status: "No Class",
                time: "-",
              }
            )
          }),
        },
      ]
    }
    return []
  }, [date, showAllData])

  const filteredData = useMemo(() => {
    return classesToDisplay.map(dayData => ({
      ...dayData,
      classes: dayData.classes.filter(record => 
        (selectedClass === 'all' || record.class === selectedClass) &&
        (selectedStatus === 'all' || record.status === selectedStatus)
      )
    })).filter(dayData => dayData.classes.length > 0)
  }, [classesToDisplay, selectedClass, selectedStatus])

  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Class', 'Status', 'Time'],
      ...attendanceData.map(item => [
        item.date,
        item.class,
        item.status,
        item.time
      ])
    ].map(e => e.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'attendance-record.csv'
    a.click()
  }

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      Present: "bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30",
      Absent: "bg-red-500/20 text-red-200 hover:bg-red-500/30",
      Holiday: "bg-amber-500/20 text-amber-200 hover:bg-amber-500/30",
      "No Class": "bg-gray-500/20 text-gray-200 hover:bg-gray-500/30"
    }
    return variants[status] || "bg-gray-500/20 text-gray-200"
  }

  return (
    <TooltipProvider>
      <main className="max-w-[75rem] w-full mx-auto p-6 space-y-8">
        <div className="fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
            Welcome, {user?.fullName || 'Guest'}
          </h1>
          <p className="text-gray-400">Track your class attendance</p>
        </div>

        <div className="stats-grid fade-in">
          <Card className="glass-card stats-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Overall Attendance
                <Tooltip>
                  <TooltipTrigger><InfoIcon className="h-4 w-4 text-gray-400" /></TooltipTrigger>
                  <TooltipContent>
                    <p>Based on {attendanceData.length} classes</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white mb-2">
                {overallStats.percentage.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">
                {overallStats.present} attended / {overallStats.total} total
              </div>
              <Progress 
                value={overallStats.percentage} 
                className="h-2 mt-4 bg-white/[0.1]" 
              />
            </CardContent>
          </Card>

          <Card className="glass-card stats-card">
            <CardHeader>
              <CardTitle className="text-lg">Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1.5">
                {monthlyOverview.map((day, index) => (
                  <div 
                    key={index}
                    className={`calendar-day ${
                      day.isWeekend ? 'bg-amber-500/20 text-amber-200' :
                      day.present > 0 ? 'bg-emerald-500/20 text-emerald-200' :
                      day.absent > 0 ? 'bg-red-500/20 text-red-200' :
                      'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {format(day.date, 'd')}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-4 text-xs">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-emerald-500/20 mr-2" />
                  <span className="text-gray-300">Present</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500/20 mr-2" />
                  <span className="text-gray-300">Absent</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-amber-500/20 mr-2" />
                  <span className="text-gray-300">Holiday</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card stats-card">
            <CardHeader>
              <CardTitle className="text-lg">Course Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {classStats.map((stat, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300 truncate max-w-[120px]">
                      {stat.className}
                    </span>
                    <span className="text-white">
                      {stat.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={stat.percentage} 
                    className="h-2 bg-white/[0.1]" 
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription className="text-gray-400">
                {showAllData ? 
                  "Showing all records for the month" : 
                  `Showing records for ${date ? format(date, 'MMM dd, yyyy') : 'selected date'}`}
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={exportToCSV}
              className="border-white/10 hover:bg-white/5"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-[240px] justify-start text-left font-normal border-white/10 hover:bg-white/5"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Choose date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate)
                      setShowAllData(false)
                    }}
                    initialFocus
                    className="rounded-md border-white/10"
                  />
                </PopoverContent>
              </Popover>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px] border-white/10">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                  <SelectItem value="No Class">No Class</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={showAllData ? "default" : "outline"}
                onClick={() => setShowAllData(!showAllData)}
                className={showAllData ? "" : "border-white/10 hover:bg-white/5"}
              >
                {showAllData ? "Show Single Day" : "Show Full Month"}
              </Button>
            </div>

            <div className="rounded-lg border border-white/10 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/[0.02]">
                    <TableHead className="text-gray-300">Date</TableHead>
                    <TableHead className="text-gray-300">Time</TableHead>
                    <TableHead className="text-gray-300">Class</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((dayData) =>
                    dayData.classes.map((record, index) => (
                      <TableRow 
                        key={`${dayData.date}-${record.class}`}
                        className="border-white/10 hover:bg-white/[0.02]"
                      >
                        {index === 0 && (
                          <TableCell 
                            rowSpan={dayData.classes.length}
                            className="text-gray-300"
                          >
                            {format(new Date(dayData.date), "EEE, MMM d")}
                          </TableCell>
                        )}
                        <TableCell className="text-gray-300">{record.time}</TableCell>
                        <TableCell className="font-medium text-white">{record.class}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                  {filteredData.length === 0 && (
                    <TableRow>
                      <TableCell 
                        colSpan={4} 
                        className="h-32 text-center text-gray-400"
                      >
                        No records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card fade-in">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <InfoIcon className="h-5 w-5 text-gray-400" />
              Data Transparency
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-gray-400">• Weekend days (Saturday and Sunday) are automatically marked as holidays</p>
            <p className="text-gray-400">• "No Class" indicates no scheduled class for that course on that day</p>
            <p className="text-gray-400">• Sample data used for demonstration purposes</p>
            <p className="text-gray-400">• Attendance percentage calculated based on recorded classes only</p>
          </CardContent>
        </Card>
      </main>
    </TooltipProvider>
  )
}