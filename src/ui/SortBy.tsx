import { useSearchParams } from "react-router-dom";

export default function SortBy({
  options,
}: {
  options: { value: string; label: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";

  function handleOnchange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <select
      value={sortBy}
      onChange={handleOnchange}
      className="appearance-none bg-white border border-gray-300 p-2 rounded-md text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
