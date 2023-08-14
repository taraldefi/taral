import { useRouter } from "next/router";
import { SortBarItem } from "../../types";

interface Prop {
  data: Array<SortBarItem>;
  width: string;
}

export default function SortBarNav({ data }: Prop) {
  const router = useRouter();

  return (
    <div className="sortBox">
      {data.map((item: SortBarItem, index: number) => {
        return (
          <div
            className="sortitem"
            onClick={(e) => {
              e.preventDefault();
              router.push(item.path);
            }}
            key={index}
          >
            <span
              className={
                item.path == router.asPath
                  ? "SortBarItem selected"
                  : "SortBarItem"
              }
            >
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
