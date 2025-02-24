import ManageBrands from "@/components/modules/shop/brand";
import { getAllBrands } from "@/services/Brand";

const ManageBrandPage = async () => {
  const { data, meta } = await getAllBrands();
  console.log(data);
  return (
    <div>
      <ManageBrands brands={data} />
    </div>
  );
};

export default ManageBrandPage;
