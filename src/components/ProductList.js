
// styles
import styles from './ProductList.module.css'

export default function ProductList({products, productClicked}) {
  return (
    <ul className={styles.productList}>
      {products && products.map(product => (
        <li key={product.id} draggable onClick={() => productClicked(product.id)}>
          <p>{product.name}</p>
          <p>${product.price}</p>
        </li>
      ))}
    </ul>
  )
}
