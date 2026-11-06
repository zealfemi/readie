import { useSearchParams } from "react-router-dom";

export default function Filter({
  filterField,
  options,
}: {
  filterField: string;
  options: { value: string; label: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams?.get(filterField) || options?.at(0)?.value;

  function handleClick(value: string) {
    searchParams.set(filterField, value);

    setSearchParams(searchParams);
  }

  return (
    <div className="border-gray-300 border flex items-center gap-1 w-full rounded-md p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={filter === option.value}
          className={`flex-1 whitespace-nowrap py-1 px-2 ${
            filter === option.value ? "bg-primary-400 text-primary-200" : ""
          } rounded-sm capitalize cursor-pointer hover:bg-primary-300 transition-colors ease-in-out duration-200`}>
          {option.label}
        </button>
      ))}
    </div>
  );
}
