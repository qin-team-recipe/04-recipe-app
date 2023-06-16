import Link from "next/link";

export default function SideBar() {
  return (
    <div className="hidden md:inline md:w-[240px] p-[20px] bg-white text-title text-[24px] top-0 self-start sticky">
      <nav>
        <ul>
          <li className="mb-[16px]">
            <Link
              href="/"
              className="flex gap-x-[9px] items-center stroke-title hover:text-primary hover:stroke-primary"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current"
              >
                <path
                  d="M16.0001 4C18.5574 4 20.6934 5.8 21.2134 8.20133C22.5789 7.8318 24.0353 8.01985 25.2622 8.72411C26.489 9.42837 27.3859 10.5912 27.7554 11.9567C28.125 13.3222 27.9369 14.7786 27.2327 16.0054C26.5284 17.2323 25.3656 18.1291 24.0001 18.4987V28H8.0001V18.4987C7.32396 18.3155 6.69053 18.001 6.13595 17.573C5.58137 17.1451 5.11652 16.6121 4.76793 16.0045C4.41934 15.3969 4.19384 14.7266 4.1043 14.0318C4.01476 13.3371 4.06295 12.6315 4.2461 11.9553C4.42925 11.2792 4.74378 10.6458 5.17173 10.0912C5.59969 9.53661 6.13268 9.07176 6.74028 8.72317C7.34789 8.37457 8.0182 8.14907 8.71296 8.05954C9.40771 7.97 10.1133 8.01818 10.7894 8.20133C11.0479 7.01142 11.7057 5.94577 12.6536 5.18148C13.6015 4.41718 14.7824 4.00026 16.0001 4Z"
                  // stroke="#1A1523"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.2146 22.6787L23.9999 22.6667"
                  // stroke="#1A1523"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="font-bold">Top Chefs</p>
            </Link>
          </li>
          <li className="mt-[24px] ml-[2px]">
            <Link
              href="/"
              className="flex gap-x-[12px] items-center stroke-title hover:text-primary hover:stroke-primary"
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke=current"
              >
                <path
                  d="M11.6667 19C16.0849 19 19.6667 15.4183 19.6667 11C19.6667 6.58172 16.0849 3 11.6667 3C7.24838 3 3.66666 6.58172 3.66666 11C3.66666 15.4183 7.24838 19 11.6667 19Z"
                  // stroke="#6f6e77"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.6667 21L17.3167 16.65"
                  // stroke="#6f6e77"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>話題を検索</p>
            </Link>
          </li>
          <li className="mt-[24px] ml-[2px]">
            <Link
              href="/favorite"
              className="flex gap-x-[12px] items-center stroke-title hover:text-primary hover:stroke-primary"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke=current"
              >
                <path
                  d="M20.4179 4.57825C19.9162 4.07482 19.3201 3.67539 18.6637 3.40284C18.0073 3.13029 17.3036 2.98999 16.5929 2.98999C15.8822 2.98999 15.1784 3.13029 14.5221 3.40284C13.8657 3.67539 13.2696 4.07482 12.7679 4.57825L11.9979 5.35825L11.2279 4.57825C10.7262 4.07482 10.1301 3.67539 9.47371 3.40284C8.81733 3.13029 8.11361 2.98999 7.40289 2.98999C6.69217 2.98999 5.98845 3.13029 5.33207 3.40284C4.67569 3.67539 4.07957 4.07482 3.57789 4.57825C1.45789 6.69825 1.32789 10.2782 3.99789 12.9982L11.9979 20.9982L19.9979 12.9982C22.6679 10.2782 22.5379 6.69825 20.4179 4.57825Z"
                  // stroke="#6F6E77"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>お気に入り</p>
            </Link>
          </li>
          <li className="mt-[24px] ml-[2px]">
            <Link
              href="/list"
              className="flex gap-x-[12px] items-center stroke-title hover:text-primary hover:stroke-primary"
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke=current"
              >
                <path
                  d="M8.33332 22C8.88561 22 9.33332 21.5523 9.33332 21C9.33332 20.4477 8.88561 20 8.33332 20C7.78104 20 7.33332 20.4477 7.33332 21C7.33332 21.5523 7.78104 22 8.33332 22Z"
                  // stroke="#6F6E77"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.3333 22C19.8856 22 20.3333 21.5523 20.3333 21C20.3333 20.4477 19.8856 20 19.3333 20C18.781 20 18.3333 20.4477 18.3333 21C18.3333 21.5523 18.781 22 19.3333 22Z"
                  // stroke="#6F6E77"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.38332 2.04999H4.38332L7.04332 14.47C7.1409 14.9248 7.39399 15.3315 7.75903 15.6198C8.12407 15.9082 8.57823 16.0603 9.04332 16.05H18.8233C19.2785 16.0493 19.7198 15.8933 20.0743 15.6078C20.4289 15.3224 20.6755 14.9245 20.7733 14.48L22.4233 7.04999H5.45332"
                  // stroke="#6F6E77"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p>買い物リスト</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
