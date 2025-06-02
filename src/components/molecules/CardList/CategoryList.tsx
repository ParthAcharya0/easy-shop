import CategoryCard from "@/components/atoms/card/CategoryCard";
import { Link } from "react-router";

const colorTheme = [
  "bg-purple-500 text-purple-900",
  "bg-green-200 text-green-600",
  "bg-orange-200 text-amber-600",
  "bg-yellow-100 text-yellow-500",
  "bg-blue-200 text-blue-600",
  "bg-pink-200 text-pink-600",
];

const CategoryList = ({ data }: any) => {
  const categories = data.map((data: any) => {
    return {
      category_id: data.category_id,
      category_name: data.category_name,
    };
  });

  // console.log(categories);
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 pt-2">
      {categories.length === 0 ? (
        <p>No Data Found</p>
      ) : (
        <>
          {categories.map((category: any, index: number) => (
            <Link to={`/category/${category.category_id}`} key={index}>
              <CategoryCard
                data={category}
                className={colorTheme[index % colorTheme.length]}
              />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default CategoryList;

// const oldCategoryList = () => {
//   const [category, setCategory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const ACCESS_TOKEN = useAppSelector((state) => state.auth.accessToken);

//   useEffect(() => {
//     async function fetchCategory() {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           "http://localhost:8081/api/category?page=1&limit=10",
//           {
//             method: "GET",
//             headers: {
//               "Content-type": "application/json; charset=UTF-8",
//               Authorization: `Bearer ${ACCESS_TOKEN}`,
//             },
//           },
//         );

//         const data = await res.json();
//         if (data.success) throw new Error(data.status_code);
//         setCategory(data.products);
//         // console.log(data);
//       } catch (error: any) {
//         // 'Failed to fetch'
//         console.log(error, error.message);
//         alert("Problem Arise in Category");
//         setLoading(false);
//       }
//     }

//     // fetchCategory();
//   }, []);

//   if (loading) {
//     return (
//       <div className="3xl flex h-full w-full justify-center py-10 text-center font-bold">
//         <span className="loader h-14 w-14"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 pt-2">
//       {category.length === 0 ? (
//         <>
//           <CategoryCard />
//           <CategoryCard className="bg-green-200 text-green-600" />
//           <CategoryCard className="bg-orange-200 text-amber-600" />
//           <CategoryCard className="bg-yellow-100 text-yellow-500" />
//           <CategoryCard className="bg-blue-200 text-blue-600" />
//           <CategoryCard className="bg-pink-200 text-pink-600" />
//         </>
//       ) : (
//         <p>No Data Found</p>
//       )}
//     </div>
//   );
// };
