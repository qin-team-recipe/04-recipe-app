"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// export const metadata = {
//   title: "Create Recipe",
//   description: "Generated by create next app",
// };

export default function CreateMyRecipe() {
  type Link = string;
  const [linkArray, setLinkArray] = useState<Link[]>([]);
  const addLinkHandler = () => {
    setLinkArray([...linkArray, ""]);
    setValue("links", [...linkArray, ""]);
  };

  const deleteLinkHandler = (index: number) => {
    const newLinkArray = [...linkArray];
    newLinkArray.splice(index, 1);
    setLinkArray(newLinkArray);
    setValue("links", newLinkArray);
  };

  type ingredient = string;
  const [ingredientArray, setIngredientArray] = useState<ingredient[]>([]);
  const addIngredientHandler = () => {
    setIngredientArray([...ingredientArray, ""]);
  };
  const deleteIngredientHandler = (index: number) => {
    const newIngredientArray = [...ingredientArray];
    newIngredientArray.splice(index, 1);
    setIngredientArray(newIngredientArray);
  };

  type step = string;
  const [stepArray, setStepArray] = useState<step[]>([]);
  const addStepHandler = () => {
    setStepArray([...stepArray, ""]);
  };
  const deleteStepHandler = (index: number) => {
    const newStepArray = [...stepArray];
    newStepArray.splice(index, 1);
    setStepArray(newStepArray);
  };

  const [servings, setServings] = useState<number>(2);
  const servingsIngredientHandler = () => {
    if (servings < 6) {
      setServings(servings + 1);
    }
  };
  const servingsDecreaseHandler = () => {
    if (servings > 1) {
      setServings(servings - 1);
    }
  };

  const [image, setImage] = useState("");
  const deleteImageHandler = () => {
    setImage("");
  };
  const uploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(e.target.files![0]);
  };

  // type MyRecipe = {
  //   title: string;
  //   ingredients: { servings: number; ingredients: string[] };
  //   steps: string[];
  //   image: string;
  //   links: Link[];
  // };
  // const [myRecipe, setMyRecipe] = useState<MyRecipe>({
  //   title: "",
  //   ingredients: { servings: 2, ingredients: [] },
  //   steps: [],
  //   image: "",
  //   links: [],
  // });

  const schema = z.object({
    title: z.string().min(1).max(50),
    // ingredients: z.object({
    //   servings: z.number().min(1).max(6),
    //   ingredients: z.array(z.string().min(1).max(50)),
    // }),
    // steps: z.array(z.string().min(1).max(50)),
    // image: z.string().url(),
    description: z.string().max(1000),
    links: z.array(z.string().url({ message: "Invalid URL" })),
  });

  type Form = z.infer<typeof schema>;

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  console.log("errors", errors);
  console.log("watch", watch());
  console.log(watch("links"));
  const links = watch("links");

  const onSubmit = async (data: Form) => {
    const {
      title,
      // ingredients: { servings, ingredients },
      // steps,
      // image,
      links,
      description,
    } = data;
    const result = window.confirm("保存しますか？");
    if (result) {
      // try {
      //   const res = await fetch(`${API_URL}/api/v1/bootcamps/`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       // Authorization: `Bearer ${token}`,
      //     },
      //     body: JSON.stringify({
      //       title,
      //       ingredients: { servings, ingredients },
      //       steps,
      //       image,
      //       links,
      //       description,
      //     }),
      //   });
      //   const json = await res.json();

      //   if (!res.ok) {
      //     toast.error(json.error);
      //   } else {
      //     toast.success("Bootcamp created");
      //     router.push(`/bootcamps/${json.data.id}`);
      //   }
      // } catch (error) {
      //   toast.error("Something went wrong");
      // }
      window.alert("保存しました");
    }
  };

  return (
    <div>
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
          <Link href="/my-recipe/drafts">下書き一覧</Link>
          {/* <button className="text-primary">作成する</button> */}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* レシピ名 */}
        <section className=" pt-[8px] pb-[24px] ">
          <label className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
            <h2 className="font-bold text-title text-[16px]">レシピ名</h2>
          </label>
          <input
            className="bg-white w-full border-border border-b-[1px] py-[13px] px-[16px] text-title focus:outline-text"
            placeholder="例：肉じゃが"
            type="text"
            {...register("title")}
          ></input>
          <p className="text-primary text-[14px] px-[16px] pt-[8px]">{errors.title?.message}</p>
        </section>

        {/* 材料 */}
        <section className=" pt-[8px] pb-[24px] ">
          <div className="flex gap-x-[20px] py-[12px] items-center px-[16px] border-border border-b-[1px]">
            <h2 className="font-bold text-title text-[16px]">材料 / {servings}人前</h2>
            {/* <input
              hidden
              className="display-none"
              type="number"
              // {...register("ingredients.servings")}
            ></input> */}

            <div className="flex gap-x-[10px] text-[25px]">
              {/* マイナスボタン */}
              <button className="hover:bg-[#FFF0EE] hover:fill-[#ca3214]" onClick={servingsDecreaseHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <rect
                    width="16"
                    height="16"
                    transform="translate(0 0.5)"
                    // fill="#FFF0EE"
                    fill={servings > 1 ? "#FFF0EE" : "#F2F2F2"}
                  />
                  <path
                    d="M3.33325 8.5H12.6666"
                    stroke={servings > 1 ? "#CA3214" : "#D1D1D1"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {/* プラスボタン */}
              <button onClick={servingsIngredientHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <rect
                    width="16"
                    height="16"
                    transform="translate(0 0.5)"
                    // fill="#FFF0EE"
                    fill={servings < 6 ? "#FFF0EE" : "#F2F2F2"}
                  />
                  <path
                    d="M7.99992 3.83333V13.1667M3.33325 8.49999H12.6666"
                    stroke={servings < 6 ? "#CA3214" : "#D1D1D1"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <ul className="bg-white">
            {ingredientArray.map((ingredient, index) => (
              <li className=" text-[14px] border-border border-b-[1px] leading-[18px] relative" key={index}>
                <input
                  className="bg-white w-full  py-[16px] pr-[48px] pl-[18px] text-title focus:outline-text"
                  // {...register(`ingredients.ingredients.${index}`)}
                ></input>
                <button
                  className="absolute top-1/2 -translate-y-1/2 right-[16px] "
                  onClick={() => deleteIngredientHandler(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-mauve-dim h-4 w-4"
                  >
                    <path d="M4 7l16 0"></path>
                    <path d="M10 11l0 6"></path>
                    <path d="M14 11l0 6"></path>
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                  </svg>
                </button>
              </li>
            ))}
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
          {/* <p className="text-primary text-[14px] px-[16px] pt-[8px]">{errors.ingredients?.servings?.message}</p> */}
          {/* {errors.ingredients &&
            errors.ingredients?.ingredients?.map((ingredient, index) => (
              <p key={index} className="text-primary text-[14px] px-[16px] pt-[8px]">
                {`${index}: ${ingredient.message}`}
              </p>
            ))} */}

          {/* <p className="text-primary text-[14px] px-[16px] pt-[8px]">{errors.ingredients?.ingredients?.message}</p> */}
        </section>

        {/* 作り方 */}
        <section className=" pt-[8px] pb-[24px] ">
          <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
            <h2 className="font-bold text-title text-[16px]">作り方</h2>
          </div>

          <ul className="bg-white">
            {stepArray.map((step, index) => (
              <li key={index} className="relative">
                <textarea
                  // {...register(`steps.${index}`)}
                  className="block w-full text-title text-[14px] py-[13px] pl-[42px] pr-[50px] border-border border-b-[1px] bg-white leading-[18px]  min-h-[100px]"
                ></textarea>
                <button className="absolute top-[14px] right-[16px] " onClick={() => deleteStepHandler(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-mauve-dim h-4 w-4"
                  >
                    <path d="M4 7l16 0"></path>
                    <path d="M10 11l0 6"></path>
                    <path d="M14 11l0 6"></path>
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                  </svg>
                </button>
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
            <button onClick={addStepHandler} className="text-primary relative pl-[20px]">
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
          {/* <p className="text-primary text-[14px] px-[16px] pt-[8px]">{errors.steps?.message}</p> */}
        </section>

        {/* 画像 */}
        <section className="pt-[8px] pb-[24px]  overflow-x-hidden">
          <div className="flex justify-between py-[12px] items-center px-[16px] ">
            <h2 className="font-bold text-title text-[16px]">画像（任意）</h2>
          </div>

          <div className="px-[16px]">
            <div className="inline-block relative">
              {image ? (
                <>
                  <Image src={image} alt="レシピの写真" width={128} height={128} />
                  <button
                    type="button"
                    className="bg-primary absolute rounded-full w-[20px] h-[20px] -top-[5px] -right-[5px]"
                    onClick={deleteImageHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-white ml-[4px]"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6l-12 12"></path>
                      <path d="M6 6l12 12"></path>
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <label
                    htmlFor="file"
                    className="text-[12px] bg-white rounded-[8px] w-[128px] h-[128px] flex flex-col gap-y-[5px] items-center justify-center cursor-pointer border-[1px] border-border"
                  >
                    <p>画像を設定</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10.0001 4.16666V15.8333M4.16675 9.99999H15.8334"
                        stroke="#6F6E77"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={uploadImageHandler}
                    accept="image/*"
                    multiple={false}
                  />
                </>
              )}
            </div>
          </div>
        </section>

        {/* レシピの紹介文 */}
        <section className=" pt-[8px] pb-[24px] ">
          <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
            <h2 className="font-bold text-title text-[16px]">レシピの紹介文（任意）</h2>
          </div>
          <textarea
            className="resize-none h-[72px] py-[12px] px-[16px] text-title text-[14px] focus:outline-text border-border border-b-[1px] bg-white leading-[18px] block w-full"
            defaultValue=""
            placeholder="レシピの紹介文を入力してください。"
            {...register("description")}
          ></textarea>
          <p className="text-primary text-[14px] px-[16px] pt-[8px]">{errors.description?.message}</p>
        </section>

        {/* リンク */}
        <section className=" pt-[8px] pb-[24px] ">
          <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
            <h2 className="font-bold text-title text-[16px]">リンク（任意）</h2>
          </div>

          <ul className="bg-white">
            {links &&
              links.map((link, index) => (
                <li className=" text-[14px] border-border border-b-[1px] leading-[18px] relative" key={index}>
                  <input
                    className="py-[15.5px] pr-[48px] pl-[16px] block text-title text-[14px] w-full focus:outline-text"
                    defaultValue={`link.${index}`}
                    {...register(`links.${index}`)}
                  ></input>
                  <button
                    className="absolute top-1/2 -translate-y-1/2 right-[16px] "
                    onClick={() => deleteLinkHandler(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-mauve-dim h-4 w-4"
                    >
                      <path d="M4 7l16 0"></path>
                      <path d="M10 11l0 6"></path>
                      <path d="M14 11l0 6"></path>
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                    </svg>
                  </button>
                </li>
              ))}
          </ul>

          <div className="py-[12px] px-[16px] ">
            <button className="text-primary relative pl-[20px]" onClick={addLinkHandler}>
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
          {/* {errors.links &&
            errors.links.map((link, index) => (
              <p className="px-[16px] text-primary text-[14px] pt-[8px]" key={index}>
                {`${index}: ${link?.message}`}
              </p>
            ))} */}
        </section>

        {/* ボタン */}
        <section className="pt-[8px] pb-[24px] px-[16px]">
          <input type="submit" value="保存する" className="text-white bg-primary py-[8px] rounded-[4px] w-full" />
        </section>

        {/* <section className="pt-[8px] pb-[24px] ">
        <div className="flex gap-x-[16px] justify-center px-[16px]">
          <button className="text-white bg-primary py-[8px] w-1/2 rounded-[4px]">保存する</button>
          <button className="text-primary bg-white border-[1px] border-primary py-[8px] w-1/2 rounded-[4px]">
            削除する
          </button>
        </div>
      </section> */}
      </form>
    </div>
  );
}
