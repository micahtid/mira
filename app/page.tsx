import Accordian from "@/components/Accordian"

const Home = () => {
  return (
    <div className="default-container flex flex-col gap-4">
      <h3 className="default-heading">This is Mira</h3>
      <p className="default-text">We'll help you connect!</p>
      <button className="default-button">
        Hello There!
      </button>
      <Accordian title="What is Mira?" content="This is a test!" />
    </div>
  )
}

export default Home