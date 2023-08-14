interface Props {
  selected: boolean;
  icon: string;
}
function PortalIcons({ selected, icon }: Props): JSX.Element {
  switch (icon.toLowerCase()) {
    case "exclamation":
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 36.6666C29.2047 36.6666 36.6666 29.2047 36.6666 20C36.6666 10.7952 29.2047 3.33331 20 3.33331C10.7952 3.33331 3.33331 10.7952 3.33331 20C3.33331 29.2047 10.7952 36.6666 20 36.6666Z"
            stroke="#64748B"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 26.6667V20"
            stroke="#64748B"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 13.3333H20.0167"
            stroke="#64748B"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "tal icon":
      return (
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect width="80" height="80" fill="url(#pattern0)" />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_1290_32723"
                transform="scale(0.00416667)"
              />
            </pattern>
            <image
              id="image0_1290_32723"
              width="240"
              height="240"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
      );
    case "order details":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 9.39996L7.5 4.20996"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.27002 6.95996L12 12.01L20.73 6.95996"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22.08V12"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "quick appli":
      return (
        <svg
          width="74"
          height="86"
          viewBox="0 0 74 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.8571 31.5714H48.4286M19.8571 43H54.1428M19.8571 54.4286H37M71.2857 71.5714V14.4286C71.2857 11.3975 70.0816 8.49062 67.9384 6.34735C65.7951 4.20408 62.8882 3 59.8571 3H14.1428C11.1118 3 8.2049 4.20408 6.06163 6.34735C3.91836 8.49062 2.71428 11.3975 2.71428 14.4286V71.5714C2.71428 74.6025 3.91836 77.5094 6.06163 79.6526C8.2049 81.7959 11.1118 83 14.1428 83H59.8571C62.8882 83 65.7951 81.7959 67.9384 79.6526C70.0816 77.5094 71.2857 74.6025 71.2857 71.5714V71.5714Z"
            stroke="#0D8489"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "full appli":
      return (
        <svg
          width="95"
          height="100"
          viewBox="0 0 95 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M92 71.8571V14.7143C92 11.6832 90.7959 8.77634 88.6526 6.63306C86.5094 4.48979 83.6025 3.28571 80.5714 3.28571H34.8571C31.8261 3.28571 28.9192 4.48979 26.7759 6.63306C24.6327 8.77634 23.4286 11.6832 23.4286 14.7143V71.8571C23.4286 74.8882 24.6327 77.7951 26.7759 79.9384C28.9192 82.0816 31.8261 83.2857 34.8571 83.2857H80.5714C83.6025 83.2857 86.5094 82.0816 88.6526 79.9384C90.7959 77.7951 92 74.8882 92 71.8571Z"
            stroke="#0D8489"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22.3143 17.2L10.8629 21.3714C8.01555 22.4085 5.69668 24.534 4.41615 27.2804C3.13562 30.0269 2.99826 33.1694 4.03428 36.0171L23.5771 89.7143C24.0906 91.1248 24.877 92.4203 25.8912 93.5269C26.9055 94.6335 28.1278 95.5294 29.4883 96.1635C30.8489 96.7977 32.3211 97.1575 33.8207 97.2226C35.3204 97.2877 36.8182 97.0567 38.2286 96.5429L70.0457 83.9829M40.5714 31.8571H69.1429M40.5714 43.2857H74.8571M40.5714 54.7143H57.7143"
            stroke="#0D8489"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "lock":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.25 8.25H3.75C2.92157 8.25 2.25 8.92157 2.25 9.75V15C2.25 15.8284 2.92157 16.5 3.75 16.5H14.25C15.0784 16.5 15.75 15.8284 15.75 15V9.75C15.75 8.92157 15.0784 8.25 14.25 8.25Z"
            stroke="#1D4ED8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.25 8.25V5.25C5.25 4.25544 5.64509 3.30161 6.34835 2.59835C7.05161 1.89509 8.00544 1.5 9 1.5C9.99456 1.5 10.9484 1.89509 11.6516 2.59835C12.3549 3.30161 12.75 4.25544 12.75 5.25V8.25"
            stroke="#1D4ED8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "right arow":
      return (
        <svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.25 9H14.75"
            stroke="#F8FAFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 3.75L14.75 9L9.5 14.25"
            stroke="#F8FAFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "attachments":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 10L12 15L17 10"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15V3"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "authorized signatory":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.9999 20.9999L16.6499 16.6499"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "ownership structure":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 11L19 13L23 9"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "disclosures":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 17H8"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 13H8"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 9H9H8"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 2V8H20"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "key relationships":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 20.9999V18.9999C22.9993 18.1136 22.7044 17.2527 22.1614 16.5522C21.6184 15.8517 20.8581 15.3515 20 15.1299"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.12988C16.8604 3.35018 17.623 3.85058 18.1676 4.55219C18.7122 5.2538 19.0078 6.11671 19.0078 7.00488C19.0078 7.89305 18.7122 8.75596 18.1676 9.45757C17.623 10.1592 16.8604 10.6596 16 10.8799"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "address":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "contact info":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.9999 16.9201V19.9201C22.0011 20.1986 21.944 20.4743 21.8324 20.7294C21.7209 20.9846 21.5572 21.2137 21.352 21.402C21.1468 21.5902 20.9045 21.7336 20.6407 21.8228C20.3769 21.912 20.0973 21.9452 19.8199 21.9201C16.7428 21.5857 13.7869 20.5342 11.1899 18.8501C8.77376 17.3148 6.72527 15.2663 5.18993 12.8501C3.49991 10.2413 2.44818 7.27109 2.11993 4.1801C2.09494 3.90356 2.12781 3.62486 2.21643 3.36172C2.30506 3.09859 2.4475 2.85679 2.6347 2.65172C2.82189 2.44665 3.04974 2.28281 3.30372 2.17062C3.55771 2.05843 3.83227 2.00036 4.10993 2.0001H7.10993C7.59524 1.99532 8.06572 2.16718 8.43369 2.48363C8.80166 2.80008 9.04201 3.23954 9.10993 3.7201C9.23656 4.68016 9.47138 5.62282 9.80993 6.5301C9.94448 6.88802 9.9736 7.27701 9.89384 7.65098C9.81408 8.02494 9.6288 8.36821 9.35993 8.6401L8.08993 9.9101C9.51349 12.4136 11.5864 14.4865 14.0899 15.9101L15.3599 14.6401C15.6318 14.3712 15.9751 14.1859 16.3491 14.1062C16.723 14.0264 17.112 14.0556 17.4699 14.1901C18.3772 14.5286 19.3199 14.7635 20.2799 14.8901C20.7657 14.9586 21.2093 15.2033 21.5265 15.5776C21.8436 15.9519 22.0121 16.4297 21.9999 16.9201Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "general info":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 16V12"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8H12.01"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "transaction details":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 17H8"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 13H8"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 9H9H8"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 2V8H20"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "closing":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 6L9 17L4 12"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "security":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "payment terms":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1V23"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "financials - p&l":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1V23"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "importer info":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 17L15 12L10 7"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 12H3"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "exporter info":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 17L21 12L16 7"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12H9"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "delete":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6H5H21"
            stroke="#F87171"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
            stroke="#F87171"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "pen":
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2.00006C16.2626 1.73741 16.5744 1.52907 16.9176 1.38693C17.2608 1.24479 17.6286 1.17163 18 1.17163C18.3714 1.17163 18.7392 1.24479 19.0824 1.38693C19.4256 1.52907 19.7374 1.73741 20 2.00006C20.2626 2.2627 20.471 2.57451 20.6131 2.91767C20.7553 3.26083 20.8284 3.62862 20.8284 4.00006C20.8284 4.37149 20.7553 4.73929 20.6131 5.08245C20.471 5.42561 20.2626 5.73741 20 6.00006L6.5 19.5001L1 21.0001L2.5 15.5001L16 2.00006Z"
            stroke="#003C6E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "eye":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
            stroke="#003C6E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="#003C6E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "summary":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 2V9H20"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "status":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 12H18L15 21L9 3L6 12H2"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "transaction":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 20V14H17"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 4V10H7"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.49 9C19.9828 7.56678 19.1209 6.2854 17.9845 5.27542C16.8482 4.26543 15.4745 3.55976 13.9917 3.22426C12.5089 2.88875 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56471 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.1518 19.7346 6.01547 18.7246C4.87913 17.7146 4.01717 16.4332 3.51 15"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "transaction docs":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 6L9 17L4 12"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "financial":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1V23"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "external reports":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 17H8"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 13H8"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 9H9H8"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 2V8H20"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "compliance":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 11L12 14L22 4"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "research & sentiment":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21L16.65 16.65"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "cover":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "trade documents":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "rating":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 11L19 13L23 9"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "sign off":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 4L12 14.01L9 11.01"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "user":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
            stroke={selected ? "#0d8489" : "#94A3B8"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
            stroke={selected ? "#0d8489" : "#94A3B8"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bell":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
            stroke={selected ? "#0d8489" : "#94A3B8"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
            stroke={selected ? "#0d8489" : "#94A3B8"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "settings":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke={selected ? "#0d8489" : "#94A3B8"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z"
            stroke={selected ? "#0d8489" : "#94A3B8"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "dollar":
      return (
        <svg
          width="20"
          height="20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            clipPath="url(#a)"
            stroke="#475569"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 .833v18.333M14.167 4.167h-6.25a2.917 2.917 0 1 0 0 5.833h4.166a2.917 2.917 0 1 1 0 5.834H5" />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h20v20H0z" />
            </clipPath>
          </defs>
        </svg>
      );
    case "interest":
      return (
        <svg
          width="20"
          height="20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.833 4.167 4.167 15.834M14.583 16.667a2.083 2.083 0 1 0 0-4.167 2.083 2.083 0 0 0 0 4.167ZM5.417 7.5a2.083 2.083 0 1 0 0-4.167 2.083 2.083 0 0 0 0 4.167Z"
            stroke="#475569"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "checkbox":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 9.16666L10 11.6667L18.3333 3.33333"
            stroke={selected ? "#0BD7A4" : "#CBD5E1"}
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 10V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H13.3333"
            stroke={selected ? "#0BD7A4" : "#CBD5E1"}
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "unCheckBox":
      return (
        <svg
          width={20}
          height={20}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.833 2.5H4.167c-.92 0-1.667.746-1.667 1.667v11.666c0 .92.746 1.667 1.667 1.667h11.666c.92 0 1.667-.746 1.667-1.667V4.167c0-.92-.746-1.667-1.667-1.667Z"
            stroke={selected ? "#0BD7A4" : "#CBD5E1"}
            strokeWidth={1.667}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "add":
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 2.9165V11.0832"
            stroke="#ECFDF5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.91667 7H11.0833"
            stroke="#ECFDF5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "upload":
      return (
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.75 8.75V11.0833C12.75 11.3928 12.6271 11.6895 12.4083 11.9083C12.1895 12.1271 11.8928 12.25 11.5833 12.25H3.41667C3.10725 12.25 2.8105 12.1271 2.59171 11.9083C2.37292 11.6895 2.25 11.3928 2.25 11.0833V8.75"
            stroke="#ECFDF5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.4167 4.66667L7.50001 1.75L4.58334 4.66667"
            stroke="#ECFDF5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 1.75V8.75"
            stroke="#ECFDF5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "view":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21L16.65 16.65"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 8V14"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 11H14"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "download":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 10L12 15L17 10"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15V3"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "unchecked":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8333 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5Z"
            stroke="#CBD5E1"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "up":
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 11.0837V2.91699"
            stroke="#059669"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.91669 7.00033L7.00002 2.91699L11.0834 7.00033"
            stroke="#059669"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "down":
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 2.91699V11.0837"
            stroke="#EF4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.0834 7L7.00002 11.0833L2.91669 7"
            stroke="#EF4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "contract":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 20H21"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.1882C20.0665 4.44557 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z"
            stroke={selected ? "#0d8489" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export { PortalIcons };
