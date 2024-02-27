import { useState } from "react"
import "./App.css"

type Book = {
  id: number
  title: string
  author: string
  year: number
}

const data: Book[] = [
  { id: 1, title: "The Fault in Our Stars", author: "John Green", year: 2012 },
  { id: 2, title: "Gone Girl", author: "Gillian Flynn", year: 2012 },
  { id: 3, title: "The Hunger Games", author: "Suzanne Collins", year: 2008 },
  {
    id: 4,
    title: "The Girl on the Train",
    author: "Paula Hawkins",
    year: 2015,
  },
  { id: 5, title: "Divergent", author: "Veronica Roth", year: 2011 },
  { id: 6, title: "The Help", author: "Kathryn Stockett", year: 2009 },
  { id: 7, title: "The Night Circus", author: "Erin Morgenstern", year: 2011 },
  { id: 8, title: "Ready Player One", author: "Ernest Cline", year: 2011 },
  { id: 9, title: "The Goldfinch", author: "Donna Tartt", year: 2013 },
  { id: 10, title: "The Martian", author: "Andy Weir", year: 2011 },
]

function App() {
  //* STATES
  const [books] = useState(data)
  const [selectedYears, setSelectedYears] = useState<number[]>([])

  //* DERIVED STATES
  const years = [
    ...new Set(
      data
        .map((book) => book.year)
        .slice()
        .sort()
    ),
  ]

  const filteredYears = selectedYears.length === 0 ? years : selectedYears

  //* HANDLER FUNCTIONS
  function handleClick(year: number) {
    //selectedYears logic
    if (!selectedYears.includes(year)) {
      setSelectedYears([...selectedYears, year].toSorted())
    } else {
      setSelectedYears(
        selectedYears.filter((selectedYear) => selectedYear !== year)
      )
    }
  }

  return (
    <>
      <h1 className="my-8 text-4xl text-center font-bold font-serif">
        Books catalog
      </h1>
      <section className="mb-8 p-4 bg-emerald-600 rounded">
        <p className="text-sm font-medium mb-2 text-gray-100">Filter by year</p>
        <ul className="flex gap-2">
          {years.map((year) => (
            <button
              key={year}
              className={`px-3 py-1 rounded-full ${
                selectedYears.includes(year) ? "bg-amber-300" : "bg-gray-100/90"
              }`}
              onClick={() => handleClick(year)}
            >
              {year}
            </button>
          ))}
        </ul>
      </section>

      <section>
        {filteredYears.map((year) => {
          const booksOfYear = books.filter((book) => year === book.year)
          return (
            <>
              <h2 className="font-semibold first:mt-8 mt-12 mb-2 text-xl">
                {year} books
              </h2>
              <ul className="list-inside list-disc grid gap-2 sm:grid-cols-2">
                {booksOfYear.map((book) => (
                  <BookItem book={book} />
                ))}
              </ul>
            </>
          )
        })}
      </section>
    </>
  )
}

function BookItem({ book }: { book: Book }) {
  return (
    <li className="grid p-4 bg-gray-100 rounded shadow">
      <p>
        <span className="text-xl font-serif font-semibold">{book.title}</span>{" "}
        &bull; <span className="text-gray-600">{book.year}</span>
      </p>

      <p className="italic">Written by {book.author}</p>
    </li>
  )
}

export default App
