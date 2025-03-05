import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
const students = [
    { "Roll Number": 1, "Email": "23bcs001@iiitdwd.ac.in", "Name": "A VAGISH ADINAD" },
    { "Roll Number": 2, "Email": "23bcs002@iiitdwd.ac.in", "Name": "AADHYA ROHISH" },
    { "Roll Number": 3, "Email": "23bcs003@iiitdwd.ac.in", "Name": "AALOK KUMAR" },
    { "Roll Number": 4, "Email": "23bcs004@iiitdwd.ac.in", "Name": "ABHINAV VERMA" },
    { "Roll Number": 5, "Email": "23bcs005@iiitdwd.ac.in", "Name": "ADARSH S KAMATAGI" },
    { "Roll Number": 6, "Email": "23bcs006@iiitdwd.ac.in", "Name": "ADITYA KUMAR SAHRAWAT" },
    { "Roll Number": 7, "Email": "23bcs007@iiitdwd.ac.in", "Name": "ADITYA SHARMA" },
    { "Roll Number": 8, "Email": "23bcs008@iiitdwd.ac.in", "Name": "AKASH SOMANATH LAMANI" },
    { "Roll Number": 9, "Email": "23bcs009@iiitdwd.ac.in", "Name": "ALAKANTI KARTHIK" },
    { "Roll Number": 10, "Email": "23bcs010@iiitdwd.ac.in", "Name": "ALOK KUMAR DAS" },
    { "Roll Number": 11, "Email": "23bcs011@iiitdwd.ac.in", "Name": "ALTAF RAJA" },
    { "Roll Number": 12, "Email": "23bcs012@iiitdwd.ac.in", "Name": "AMAL MOHANAN" },
    { "Roll Number": 13, "Email": "23bcs013@iiitdwd.ac.in", "Name": "AMRITANSHU ADITYA" },
    { "Roll Number": 15, "Email": "23bcs015@iiitdwd.ac.in", "Name": "ANKIT KUMAR KESHARI" },
    { "Roll Number": 16, "Email": "23bcs016@iiitdwd.ac.in", "Name": "ANSH HARDAHA" },
    { "Roll Number": 17, "Email": "23bcs017@iiitdwd.ac.in", "Name": "ARUNODAYA HOSAKERI" },
    { "Roll Number": 18, "Email": "23bcs018@iiitdwd.ac.in", "Name": "ARYAN ANILKUMAR TALIKOTI" },
    { "Roll Number": 19, "Email": "23bcs019@iiitdwd.ac.in", "Name": "ASHISH SINGH" },
    { "Roll Number": 20, "Email": "23bcs020@iiitdwd.ac.in", "Name": "ATHUL NOBLE" },
    { "Roll Number": 21, "Email": "23bcs021@iiitdwd.ac.in", "Name": "ATITHI JAIMAN" },
    { "Roll Number": 22, "Email": "23bcs022@iiitdwd.ac.in", "Name": "ATULESH SAHOO" },
    { "Roll Number": 23, "Email": "23bcs023@iiitdwd.ac.in", "Name": "AUSULA KOUSTUBH" },
    { "Roll Number": 24, "Email": "23bcs024@iiitdwd.ac.in", "Name": "AYUSHMAAN MANISH KUMAR" },
    { "Roll Number": 25, "Email": "23bcs025@iiitdwd.ac.in", "Name": "B VINAYAKA" },
    { "Roll Number": 26, "Email": "23bcs026@iiitdwd.ac.in", "Name": "BABHALE ROHAN LAXMIKANT" },
    { "Roll Number": 27, "Email": "23bcs027@iiitdwd.ac.in", "Name": "BANOTU DINESH" },
    { "Roll Number": 28, "Email": "23bcs028@iiitdwd.ac.in", "Name": "BARGHAV ABHILASH B R" },
    { "Roll Number": 29, "Email": "23bcs029@iiitdwd.ac.in", "Name": "BHAGYA VISHWAKARMA" },
    { "Roll Number": 30, "Email": "23bcs030@iiitdwd.ac.in", "Name": "BHOOMIKA MAHESH MANNUR" },
    { "Roll Number": 31, "Email": "23bcs031@iiitdwd.ac.in", "Name": "BHUKYA KARTHIK" },
    { "Roll Number": 32, "Email": "23bcs032@iiitdwd.ac.in", "Name": "BHUMICA JAISWAL" },
    { "Roll Number": 33, "Email": "23bcs033@iiitdwd.ac.in", "Name": "BIKRAM HAWLADAR" },
    { "Roll Number": 34, "Email": "23bcs034@iiitdwd.ac.in", "Name": "BODDEPALLI LAKSHMI VARA PRASAD" },
    { "Roll Number": 35, "Email": "23bcs035@iiitdwd.ac.in", "Name": "BOPPUDI OM SAI CHAND" },
    { "Roll Number": 36, "Email": "23bcs036@iiitdwd.ac.in", "Name": "CHEERA SAI SATHWIK" },
    { "Roll Number": 37, "Email": "23bcs037@iiitdwd.ac.in", "Name": "DARABOINA HARSHITH" },
    { "Roll Number": 38, "Email": "23bcs038@iiitdwd.ac.in", "Name": "DAWARE GANESH DIGAMBAR" },
    { "Roll Number": 39, "Email": "23bcs039@iiitdwd.ac.in", "Name": "DEEPENDRA KUMAR SINGH" },
    { "Roll Number": 40, "Email": "23bcs040@iiitdwd.ac.in", "Name": "DEVANSH BHARDWAJ" },
    { "Roll Number": 41, "Email": "23bcs041@iiitdwd.ac.in", "Name": "DHANGAR VENKATESH CHANDRAKANT" },
    { "Roll Number": 42, "Email": "23bcs042@iiitdwd.ac.in", "Name": "DHANRAJ MATKE" },
    { "Roll Number": 43, "Email": "23bcs043@iiitdwd.ac.in", "Name": "DHARMENDRA GORA" },
    { "Roll Number": 44, "Email": "23bcs044@iiitdwd.ac.in", "Name": "DHRUV ANAND KOLI" },
    { "Roll Number": 45, "Email": "23bcs045@iiitdwd.ac.in", "Name": "DHULIPALLA HARSHA VARDHAN9" },
    { "Roll Number": 46, "Email": "23bcs046@iiitdwd.ac.in", "Name": "DUDLEWAR ADINATH BALAJIRAO" },
    { "Roll Number": 47, "Email": "23bcs047@iiitdwd.ac.in", "Name": "DUSARY CHARAN" },
    { "Roll Number": 48, "Email": "23bcs048@iiitdwd.ac.in", "Name": "G V PRAJWAL" },
    { "Roll Number": 49, "Email": "23bcs049@iiitdwd.ac.in", "Name": "GADUPUDI RAKESH" },
    { "Roll Number": 50, "Email": "23bcs050@iiitdwd.ac.in", "Name": "GANESH KUMATOLE" },
    { "Roll Number": 51, "Email": "23bcs051@iiitdwd.ac.in", "Name": "GUJJA SRIVARSHITH RAO" },
    { "Roll Number": 52, "Email": "23bcs052@iiitdwd.ac.in", "Name": "HAMMAD MALIK" },
    { "Roll Number": 53, "Email": "23bcs053@iiitdwd.ac.in", "Name": "HARSHAL RATAN KASAR" },
    { "Roll Number": 54, "Email": "23bcs054@iiitdwd.ac.in", "Name": "HARSHIT TRIPATHI" },
    { "Roll Number": 55, "Email": "23bcs055@iiitdwd.ac.in", "Name": "HIMANSHU KUMAR" },
    { "Roll Number": 56, "Email": "23bcs056@iiitdwd.ac.in", "Name": "INTURI MOKSHAGNA" },
    { "Roll Number": 57, "Email": "23bcs057@iiitdwd.ac.in", "Name": "JAYESH VIJAY PATIL" },
    { "Roll Number": 58, "Email": "23bcs058@iiitdwd.ac.in", "Name": "JYOTINDER YADAV" },
    { "Roll Number": 59, "Email": "23bcs059@iiitdwd.ac.in", "Name": "K GANESH CHAVHAN" },
    { "Roll Number": 60, "Email": "23bcs060@iiitdwd.ac.in", "Name": "K L N SAI ADITYA" },
    { "Roll Number": 61, "Email": "23bcs061@iiitdwd.ac.in", "Name": "KAGITHA LIKHITH" },
    { "Roll Number": 62, "Email": "23bcs062@iiitdwd.ac.in", "Name": "KAMATHAM SUNIL" },
    { "Roll Number": 63, "Email": "23bcs063@iiitdwd.ac.in", "Name": "KAMBLE SAKSHAM SUCHIVRAT" },
    { "Roll Number": 64, "Email": "23bcs064@iiitdwd.ac.in", "Name": "KANDIMALLA SHRIYANS" },
    { "Roll Number": 65, "Email": "23bcs065@iiitdwd.ac.in", "Name": "KATTA AVANEESH RAO" },
    { "Roll Number": 66, "Email": "23bcs066@iiitdwd.ac.in", "Name": "KISHLAY SINGH" },
    { "Roll Number": 67, "Email": "23bcs067@iiitdwd.ac.in", "Name": "KONDETI VENKATA MODAK PRASANNA KUMAR" },
    { "Roll Number": 68, "Email": "23bcs068@iiitdwd.ac.in", "Name": "KOPURI HEMADITHYA" },
    { "Roll Number": 69, "Email": "23bcs069@iiitdwd.ac.in", "Name": "KOTA SANJAY VEDA" },
    { "Roll Number": 70, "Email": "23bcs070@iiitdwd.ac.in", "Name": "KOTHAPALLI SAI RITHVIK" }
];

  for (const student of students) {
    await prisma.attendance.create({
      data: {
        studentRollNo: student["Roll Number"],
        name: student["Name"],
      },
    });
  }
  console.log("Student records have been seeded.");
}

main()
  .catch((error) => {
    console.error("Error seeding student records:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
