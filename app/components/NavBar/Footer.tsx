import Link from "next/link";
// import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className="md:hidden fixed w-full bottom-0 py-[8px] bg-white">
      <nav>
        <ul className="flex justify-between text-[10px] text-center">
          <li className="w-1/3 hover:text-primary">
            <Link href="/">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-[#908E96] inline-block hover:stroke-primary"
              >
                <path
                  d="M11.6667 19C16.0849 19 19.6667 15.4183 19.6667 11C19.6667 6.58172 16.0849 3 11.6667 3C7.24838 3 3.66666 6.58172 3.66666 11C3.66666 15.4183 7.24838 19 11.6667 19Z"
                  // stroke="#6f6e77"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21.6667 21L17.3167 16.65"
                  // stroke="#6f6e77"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="mt-[2px]">検索</p>
            </Link>
          </li>
          <li className="w-1/3 hover:text-primary">
            <Link href="/favorite">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-[#908E96] inline-block hover:stroke-primary"
              >
                <path
                  d="M20.4179 4.57825C19.9162 4.07482 19.3201 3.67539 18.6637 3.40284C18.0073 3.13029 17.3036 2.98999 16.5929 2.98999C15.8822 2.98999 15.1784 3.13029 14.5221 3.40284C13.8657 3.67539 13.2696 4.07482 12.7679 4.57825L11.9979 5.35825L11.2279 4.57825C10.7262 4.07482 10.1301 3.67539 9.47371 3.40284C8.81733 3.13029 8.11361 2.98999 7.40289 2.98999C6.69217 2.98999 5.98845 3.13029 5.33207 3.40284C4.67569 3.67539 4.07957 4.07482 3.57789 4.57825C1.45789 6.69825 1.32789 10.2782 3.99789 12.9982L11.9979 20.9982L19.9979 12.9982C22.6679 10.2782 22.5379 6.69825 20.4179 4.57825Z"
                  // stroke="#6F6E77"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="mt-[2px]">お気に入り</p>
            </Link>
          </li>
          <li className="w-1/3 hover:text-primary">
            <Link href="/cart">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-[#908E96] inline-block hover:stroke-primary"
              >
                <path
                  d="M8.33332 22C8.88561 22 9.33332 21.5523 9.33332 21C9.33332 20.4477 8.88561 20 8.33332 20C7.78104 20 7.33332 20.4477 7.33332 21C7.33332 21.5523 7.78104 22 8.33332 22Z"
                  // stroke="#6F6E77"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.3333 22C19.8856 22 20.3333 21.5523 20.3333 21C20.3333 20.4477 19.8856 20 19.3333 20C18.781 20 18.3333 20.4477 18.3333 21C18.3333 21.5523 18.781 22 19.3333 22Z"
                  // stroke="#6F6E77"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.38332 2.04999H4.38332L7.04332 14.47C7.1409 14.9248 7.39399 15.3315 7.75903 15.6198C8.12407 15.9082 8.57823 16.0603 9.04332 16.05H18.8233C19.2785 16.0493 19.7198 15.8933 20.0743 15.6078C20.4289 15.3224 20.6755 14.9245 20.7733 14.48L22.4233 7.04999H5.45332"
                  // stroke="#6F6E77"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p className="mt-[2px]">お買い物</p>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
