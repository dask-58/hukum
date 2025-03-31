"use client"
import { useState, useMemo, useEffect } from "react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWeekend } from "date-fns"
import { CalendarIcon, InfoIcon, DownloadIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { TooltipProvider } from "@/components/ui/tooltip"
import FileUpload from "@/components/FileUpload"
import { AdminDashboard } from "@/components/AdminDashboard"
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table'
import { Input } from "@/components/ui/input"

const allClasses = ["CS301 - Software Engineering"]

export default function DashboardPage() {
  const { user, isSignedIn } = useUser()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showAllData, setShowAllData] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [attendanceData, setAttendanceData] = useState<any[]>([])
  const [overallPercentage, setOverallPercentage] = useState<number>(0)
  const [searchName, setSearchName] = useState<string>("")

  const isAdmin = user?.emailAddresses.some(email => 
    ["vivekraj@iiitdwd.ac.in","googldhruv@gmail.com", "23bcs013@iiitdwd.ac.in", "23bcs028@iiitdwd.ac.in"].includes(email.emailAddress)
  )

  if (isAdmin) {
    return <AdminDashboard />
  }

  const extractRollNo = (email: string): number | null => {
    const match = email.match(/23bcs0*(\d+)/i)
    return match ? parseInt(match[1]) : null
  }

  useEffect(() => {
    const fetchAttendance = async () => {
      if (user && user.emailAddresses.length > 0) {
        const email = user.emailAddresses[0].emailAddress
        const rollNo = extractRollNo(email)
        if (!rollNo) return
        try {
          const res = await fetch(`/api/student/dashboard?rollNo=${rollNo}`)
          const data = await res.json()
          if (data.error) {
            console.error(data.error)
            return
          }
          setOverallPercentage(data.attendancePercentage || 0)
          const transformed = Object.entries(data)
            .filter(([key]) => key.startsWith("date_"))
            .map(([key, value], index) => ({
              id: index + 1,
              date: key.replace("date_", "").replace(/_/g, "-"),
              class: allClasses[0],
              status: value || "No Class",
            }))
          setAttendanceData(transformed)
        } catch (error) {
          console.error("Error fetching attendance:", error)
        }
      }
    }
    fetchAttendance()
  }, [user])

  const { overallStats, monthlyOverview } = useMemo(() => {
    const totalClasses = attendanceData.length
    const presentClasses = attendanceData.filter(record => record.status === "Present").length

    const currentDate = date || new Date()
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

    const mOverview = daysInMonth.map(day => {
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
        percentage: overallPercentage
      },
      monthlyOverview: mOverview
    }
  }, [attendanceData, date, overallPercentage])

  const classesToDisplay = useMemo(() => {
    const currentDate = date || new Date()
    const monthDates = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) })
    if (showAllData) {
      return monthDates.map((day) => {
        const formattedDate = format(day, "yyyy-MM-dd")
        if (isWeekend(day)) {
          return {
            date: formattedDate,
            classes: [{ class: "Weekend", status: "Holiday" }],
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
              }
            )
          }),
        }
      })
    } else {
      const formattedDate = format(currentDate, "yyyy-MM-dd")
      if (isWeekend(currentDate)) {
        return [
          {
            date: formattedDate,
            classes: [{ class: "Weekend", status: "Holiday" }],
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
              }
            )
          }),
        },
      ]
    }
  }, [attendanceData, date, showAllData])

  const filteredData = useMemo(() => {
    return classesToDisplay.map(dayData => ({
      ...dayData,
      classes: dayData.classes.filter(record => 
        selectedStatus === 'all' || record.status === selectedStatus
      )
    })).filter(dayData => dayData.classes.length > 0)
  }, [classesToDisplay, selectedStatus])

  // Flatten filteredData to build our table rows
  const tableData = useMemo(() => {
    return filteredData.flatMap(dayData =>
      dayData.classes.map(rec => ({
        date: dayData.date,
        class: rec.class,
        status: rec.status,
      }))
    ).filter(item => item.class.toLowerCase().includes(searchName.toLowerCase()))
  }, [filteredData, searchName])

  // TanStack Table columns setup
  type RowData = {
    date: string,
    class: string,
    status: string
  }

  const columnHelper = createColumnHelper<RowData>()

  const columns = useMemo(() => [
    columnHelper.accessor('date', {
      header: 'Date',
      cell: info => format(new Date(info.getValue()), "EEE, MMM d")
    }),
    columnHelper.accessor('class', {
      header: 'Class',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <Badge className={getStatusBadge(info.getValue())}>
          {info.getValue()}
        </Badge>
      ),
    }),
  ], [columnHelper])

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Class', 'Status'],
      ...attendanceData.map(item => [
        item.date,
        item.class,
        item.status,
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

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Attendance Dashboard</h1>
        <p className="text-lg mb-6">Please sign in to view your attendance records.</p>
        <Button onClick={() => window.location.href = "/sign-in"}>Sign In</Button>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <main className="max-w-[75rem] w-full mx-auto p-6 space-y-8">
        <div className="fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
            Hello, {user?.fullName?.replace(/ IIIT Dharwad$/, '') || 'Guest'}
          </h1>
          <p className="text-gray-400">Track your class attendance</p>
        </div>
        <div className="stats-grid fade-in">
          {isAdmin && (<FileUpload />)}
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
              <CardTitle className="text-lg">Attendance Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Present</span>
                <span className="text-white">
                  {attendanceData.filter(record => record.status === "Present").length}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Absent</span>
                <span className="text-white">
                  {attendanceData.filter(record => record.status === "Absent").length}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">No Class</span>
                <span className="text-white">
                  {attendanceData.filter(record => record.status === "No Class").length}
                </span>
              </div>
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

            {/* Search Input */}
            <Input
              type="text"
              placeholder="Search by class name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="mb-4 border-white/10"
            />

            <div className="rounded-lg border border-white/10 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-800">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id} className="p-3 border-b border-white/10">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-white/[0.02]">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="p-3 border-b border-white/10">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {tableData.length === 0 && (
                    <tr>
                      <td colSpan={3} className="h-32 text-center text-gray-400">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
            <p className="text-gray-400">• Attendance percentage calculated based on recorded classes only</p>
          </CardContent>
        </Card>
      </main>
    </TooltipProvider>
  )
}
