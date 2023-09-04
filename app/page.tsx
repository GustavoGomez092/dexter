import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Header />
      <div className="container flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-center">Welcome to Dexter</h1>
        <p className="text-xl text-center">A code challenge platform for job applicants</p>
      </div>
      <Footer />
    </main>
  )
}
