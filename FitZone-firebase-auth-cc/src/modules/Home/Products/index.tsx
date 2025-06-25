import { basketballProducts } from "./data";
import { IndividualProductType, ProductType } from "./types";

function IndividualProduct({ product }: IndividualProductType) {
  return (
    <a key={product.id} href={product.href} className="group">
      <div className="w-[330px] h-[400px] overflow-hidden rounded-lg bg-gray-200 mx-auto">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="w-full h-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-center">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-center">{product.price}</p>
    </a>
  );
}

const Products = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px6 sm:sm-24 lg:max-w-7xl lg:px-9">
      <h2 className="sr-only">Products</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
        {basketballProducts.map((product: ProductType) => (
          <IndividualProduct product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
