import {useEffect, useState} from "react"
import "./ProductDetailsInfo.css"
import RecommendedProducts from "../RecommendedProducts/RecommendedProducts"
import Counter from "../Counter/Counter"
import ProductDetailsInfoImages from "../ProductDetailsInfoImages/ProductDetailsInfoImages"

const className = "ProductDetailsInfo"

const ProductDetailsInfo = ({data, params}) => {

  const [windowSize, setWindowSize] = useState()



  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
  })

  const imageSizer = () => {
    if(windowSize <= 600) {
      return "mobile"
    } else if (windowSize <= 1400) {
      return "tablet"
    } else {
      return "desktop"
    }
  } 

  params = params.slice(1) - 1

  const IncludedItems = () => {
    return data[params].includes.map((items, index) => {
      return (
          <div key={index} className={`${className}BoxContentsText`}> 
            <span div className={`${className}BoxContentsQuantity`}> 
                {items.quantity}
            </span> {items.item}  
          </div>
      )
    })
  }

  return (
      <div className={`${className}Container`} >  
        <div className={`${className}ProductContainer`}> 
            <img className={`${className}Image`} src={data ? `${process.env.PUBLIC_URL}${data[params].image[imageSizer()].slice(1)}` : ""} alt="product" />
            <div className={`${className}TextContainer`}> 
                <h2 className={`${className}NewProductHeading`}> 
                    {data &&  data[params].new === true ? "New Product" : ""} 
                </h2>
                <h2 className={`${className}ProductHeading`}>
                    {data && data[params].name.toUpperCase()}
                </h2>
                <p className={`${className}Paragraph`}> 
                    {data && data[params].description}
                </p>
                <h2 className={`${className}Price`}> $ {data && data[params].price} </h2>
                <div className={`${className}Button`}> 
                <Counter params={params} />
                </div>
            </div>
        </div>
        <div className={`${className}FlexContainer`}> 
            <div className={`${className}FeaturesContainer`}> 
                <h2 className={`${className}Features`}> FEATURES  </h2>
                <section className={`${className}FeaturesText`}> {data && data[params].features} </section>
            </div>
            <div className={`${className}BoxContentsContainer`}>       
                  <h2 className={`${className}BoxContentsHeading`}> IN THE BOX</h2>
                  <div className={`${className}BoxContentsList`}> 
                      {data && IncludedItems()}
                  </div>
            </div>
        </div>
        <ProductDetailsInfoImages params={params} data={data} />
        <RecommendedProducts params={params} data={data}/>
      </div>
  )
}

export default ProductDetailsInfo