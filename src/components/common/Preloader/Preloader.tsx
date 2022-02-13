import React, {FC} from "react"
import styles from "./Preloader.module.css"

const Preloader: FC = () => {

    const imgLoading = `${process.env.PUBLIC_URL}/assets/images/CapsuleLoading.svg`

    return (
        <img className={styles.preloaderImage} src={imgLoading} alt="noPhoto"/>
    )
}

export {Preloader}