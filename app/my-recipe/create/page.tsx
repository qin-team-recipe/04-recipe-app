"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// export const metadata = {
//   title: "Create Recipe",
//   description: "Generated by create next app",
// };

export default function CreateMyRecipe() {

  const [linkArray, setLinkArray] = useState([
    {
      url: "https://www.instagram.com",
    },
    {
      url: "https://www.chef-website.com",
    },
  ])
  const addLinkHandler = () => {
    setLinkArray([...linkArray, { url: "" }])
  }
  const deleteLinkHandler = (index: number) => {
    const newLinkArray = [...linkArray]
    newLinkArray.splice(index, 1)
    setLinkArray(newLinkArray)
  }


  const [ingredientArray, setIngredientArray] = useState([
    "キャベツ 5〜6枚", "チーズ 5〜6枚"])
  const addIngredientHandler = () => {
    setIngredientArray([...ingredientArray, ""])
  }
  const deleteIngredientHandler = (index: number) => {
    const newIngredientArray = [...ingredientArray]
    newIngredientArray.splice(index, 1)
    setIngredientArray(newIngredientArray)
  }

  const [stepArray, setStepArray] = useState([
    "一行テスト",
    "複数行ある場合のダミーテキスト。複数行ある場合のダミーテキスト。複数行ある場合のダミーテキスト。複数行ある場合のダミーテキスト。複数行ある場合のダミーテキスト。"
  ])
  const addStepHandler = () => {
    setStepArray([...stepArray, ""])
  }
  const deleteStepHandler = (index: number) => {
    const newStepArray = [...stepArray]
    newStepArray.splice(index, 1)
    setStepArray(newStepArray)
  }


  const [servings, setServings] = useState(2);
  const servingsIngredientHandler = () => {
    if (servings < 6) {
      setServings(servings + 1)
    }
  }
  const servingsDecreaseHandler = () => {
    if (servings > 1) {
      setServings(servings - 1)
    }
  }



  return (
    <>
      {/* ヘッダー */}
      <div className="px-[15px] border-b-[1px] border-border text-center font-bold text-[16px] py-[12px] flex justify-between">
        <Link href="/favorite">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_380_1890)">
              <path d="M18 6L6 18" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_380_1890">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>

        <div className="flex gap-x-[16px]">
          <Link href="/my-recipe/drafts">下書き</Link>
          <button className="text-primary">作成する</button>
        </div>
      </div>


      {/* レシピ名 */}
      <section className=" pt-[8px] pb-[24px] ">
        <label className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
          <h2 className="font-bold text-title text-[16px]">レシピ名</h2>
        </label>
        <input
          className="bg-white w-full border-border border-b-[1px] py-[13px] px-[16px] text-title focus:outline-text"
          placeholder="例：肉じゃが"
        ></input>
      </section>

      {/* 材料 */}
      <section className=" pt-[8px] pb-[24px] ">
        <div className="flex gap-x-[20px] py-[12px] items-center px-[16px] border-border border-b-[1px]">
          <h2 className="font-bold text-title text-[16px]">材料 / {servings}人前</h2>
          <div className="flex gap-x-[10px] text-[25px]">
            <button className={servings > 1 ? "text-primary" : ""} onClick={servingsDecreaseHandler}>-</button>
            <button className={servings < 6 ? "text-primary" : ""} onClick={servingsIngredientHandler}>+</button>
          </div>
        </div>

        <ul className="bg-white">
          {
            ingredientArray.map((ingredient, index) => (
              <li className=" text-[14px] border-border border-b-[1px] leading-[18px] relative" key={index}>
                <input className="bg-white w-full  py-[13px] px-[16px] text-title focus:outline-text" defaultValue={ingredient}>
                </input>
                <button className="absolute top-1/2 -translate-y-1/2 right-[16px] text-primary" onClick={
                  () => deleteIngredientHandler(index)
                }>削除</button>
              </li>
            ))
          }


        </ul>
        <div className="py-[12px] px-[16px] ">
          <button className="text-primary relative pl-[20px]" onClick={addIngredientHandler}>
            <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[16px] h-[16px]">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_391_2064)">
                  <path d="M8 3.83334V13.1667" stroke="#E54D2E" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3.33337 8.5H12.6667" stroke="#E54D2E" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_391_2064">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            材料を追加する
          </button>
        </div>
      </section >

      {/* 作り方 */}
      <section className=" pt-[8px] pb-[24px] " >
        <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
          <h2 className="font-bold text-title text-[16px]">作り方</h2>
        </div>

        <ul className="bg-white">
          {
            stepArray.map((step, index) => (
              <li className="text-title text-[14px] py-[13px] pl-[42px] pr-[50px] border-border border-b-[1px] bg-white leading-[18px] relative" key={index}>
                <p className="block" >
                  {step}
                </p>
                <button className="absolute top-1/2 -translate-y-1/2 right-[16px] text-primary" onClick={
                  () => deleteStepHandler(index)
                }>削除</button>
                <span className="absolute top-[14px] left-[16px] w-[18px] h-[18px] text-white text-[12px] rounded-full bg-primary text-center leading-[18px] ">
                  {index + 1}
                </span>
              </li>
              // <li className="relative" key={index}>
              //   <input className="block py-[8px] pr-[16px] pl-[42px] border-b-[1px] border-border w-full" defaultValue={step}>
              //     {/* <p className="text-title text-[14px]">
              //   用意するメインの材料は、マカロニ、牛乳、鶏もも肉、玉ねぎ、椎茸で、バター、小麦粉、塩、こしょうも使用します。
              // </p> */}
              //     {/* <p className="mt-[4px] text-[10px]">
              //   ※椎茸はなしでも作れますし、しめじやマッシュルームなどでも。きのこ系が入っていた方が食感と香りがよいので、ぜひ入れて作ってみてください。鶏肉等の代用については下記補足に
              // </p> */}
              //   </input>
              //   <span className="absolute top-[8px] left-[16px] w-[18px] h-[18px] text-white text-[12px] rounded-full bg-primary text-center leading-[18px] ">
              //     1
              //   </span>
              // </li>
            ))}

        </ul>
        <div className="py-[12px] px-[16px] ">
          <button className="text-primary relative pl-[20px]"
            onClick={() => {
              window.alert("工程を追加します")
            }}
          >
            <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[16px] h-[16px]">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_391_2064)">
                  <path d="M8 3.83334V13.1667" stroke="#E54D2E" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3.33337 8.5H12.6667" stroke="#E54D2E" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_391_2064">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            工程を追加する
          </button>
        </div>
      </section >

      {/* 画像 */}
      <section className="pt-[8px] pb-[24px]  overflow-x-hidden" >
        <div className="flex justify-between py-[12px] items-center px-[16px] ">
          <h2 className="font-bold text-title text-[16px]">画像</h2>
        </div>

        <div className="px-[16px]">
          <div className="inline-block relative">
            <Image src="/images/top/recipes/recipe1.png" alt="レシピの写真" width={128} height={128} />
            <button type="button" className="bg-primary absolute rounded-full w-[20px] h-[20px] -top-[5px] -right-[5px]">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="stroke-white ml-[4px]"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </button>
          </div>


        </div>

        <div className="py-[12px] px-[16px] ">
          <button className="text-primary relative pl-[20px]"
            onClick={() => {
              window.alert("画像を追加します")
            }}
          >
            <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[16px] h-[16px]">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_391_2064)">
                  <path d="M8 3.83334V13.1667" stroke="#E54D2E" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3.33337 8.5H12.6667" stroke="#E54D2E" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_391_2064">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            画像を追加する
          </button>
        </div>
      </section>

      {/* リンク */}
      <section className=" pt-[8px] pb-[24px] " >
        <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
          <h2 className="font-bold text-title text-[16px]">リンク</h2>
        </div>

        <ul className="bg-white">
          {
            linkArray.map((link, index) => (
              <li className=" text-[14px] border-border border-b-[1px] leading-[18px] relative" key={index}>
                <input
                  className="py-[15.5px] px-[16px] block text-title text-[14px] w-full focus:outline-text"
                  defaultValue={link.url}
                ></input>
                <button className="absolute top-1/2 -translate-y-1/2 right-[16px] text-primary" onClick={() => deleteLinkHandler(index)}>削除</button>
              </li>
            )
            )
          }
        </ul >

        <div className="py-[12px] px-[16px] ">
          <button className="text-primary relative pl-[20px]"
            onClick={addLinkHandler}
          >
            <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[16px] h-[16px]">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_391_2064)">
                  <path d="M8 3.83334V13.1667" stroke="#E54D2E" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3.33337 8.5H12.6667" stroke="#E54D2E" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_391_2064">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            リンクを追加する
          </button>
        </div>
      </section >

    </>
  );
}
