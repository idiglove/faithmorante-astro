import { useEffect, useState } from "react"
import CaretDown from "./CaretDown"
import CaretUp from "./CaretUp"
import styles from "./../styles/home.module.scss"
import AbstractVideo from './../assets/abstract-blue-video.mp4'

export default function Page() {
  const [showArrowDown, setShowArrowDown] = useState(true)

  useEffect(() => {
    const h1 = document.getElementsByTagName("h1")?.[0]
    document.addEventListener("wheel", (e) => {
      if (h1) {
        h1.scrollBy(e.deltaX, e.deltaY)
        toggleArrow(h1)
      }
    })

    document.body.addEventListener(
      "touchmove",
      touchmove as (this: HTMLElement, ev: TouchEvent) => any
    )
    document.body.addEventListener(
      "touchstart",
      touchstart as (this: HTMLElement, ev: TouchEvent) => any
    )

    let startX: number = 0,
      startY: number = 0

    function touchstart(e: any) {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    function touchmove(e: any) {
      let deltaX = e.touches[0].clientX - startX,
        deltaY = e.touches[0].clientY - startY

      if (h1) {
        h1.scrollBy(deltaX, deltaY)
        toggleArrow(h1)
      }
    }
  }, [])

  const toggleArrow = (el: HTMLHeadingElement | undefined) => {
    const scrollHeight = el?.scrollHeight ?? 0
    const scrollTop = el?.scrollTop ?? 0
    if (scrollHeight - scrollTop === el?.clientHeight) {
      setShowArrowDown(false)
    }

    if (scrollTop === 0) {
      setShowArrowDown(true)
    }
  }

  const onScrollClick = (type: string) => {
    const scrollNum = type === "down" ? 100 : -100
    const h1 = document.getElementsByTagName("h1")?.[0]
    h1?.scrollBy(0, scrollNum)

    toggleArrow(h1)
  }

  return (
    <div className={styles["home-wrapper"]}>
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        src={AbstractVideo}
      ></video>
      <h1>
        Hi! <br /> I'm Faith Morante!
        <br />I like making things happen.
        <br />
        <br />
        I'm a Software Engineer <br />
        since 2015.
        <br />
        <br />I blog, paint and make games among many things.
        <br />
        <br />
        Hire me. <br />
        Or join my Discord for free mentorship.
      </h1>
      {showArrowDown ? (
        <CaretDown onClick={() => onScrollClick("down")} />
      ) : (
        <CaretUp onClick={() => onScrollClick("up")} />
      )}
    </div>
  )
}
