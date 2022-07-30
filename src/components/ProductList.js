
export default function ProductList({products}) {
  return (
    <ul>
      {products && products.map(product => (
        <li key={product.id}>{product.name} - ${product.price}</li>
      ))}
    </ul>
  )
}
