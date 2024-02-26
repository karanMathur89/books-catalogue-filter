import { useState } from "react"
import "./App.css"

type Book = {
  id: number
  title: string
  author: string
  year: number
}

const books: Book[] = [
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
  const [data, setData] = useState(books)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  //* DERIVED STATES
  const years = [
    ...new Set(
      data
        .map((book) => book.year)
        .slice()
        .sort()
    ),
  ]

  return (
    <>
      <ul className="bg-yellow-100 p-4 mb-4 w-fit">
        <li>
          <strong>selectedYear: </strong>
          {selectedYear || "null"}
        </li>
      </ul>
      <section className="mb-8">
        <p className="text-sm font-semibold mb-2 text-gray-800 indent-3">
          Filter by year
        </p>
        <ul className="flex gap-2">
          {years.map((year) => (
            <button
              className={`px-3 py-1 rounded-full ${
                year === selectedYear ? "bg-yellow-300" : "bg-gray-100"
              }`}
              onClick={() => {
                if (year !== selectedYear) {
                  setSelectedYear(year)
                  return
                }
                setSelectedYear(null)
              }}
            >
              {year}
            </button>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Books by year</h2>
        {years.map((year) => {
          const booksOfYear = data.filter((book) => book.year === year)
          return (
            <>
              <h3 className="font-semibold mt-4">{year}</h3>
              <ul className="list-inside list-disc">
                {booksOfYear.map((book) => (
                  <li>
                    {book.title}({book.year})
                  </li>
                ))}
              </ul>
            </>
          )
        })}
      </section>
    </>
  )
}

export default App
