// // import { dict, TKey } from "../i18n/translations";
// import { dict } from "../i18n/translations";
// import type { TKey } from "../i18n/translations";
// import { useAppSelector } from "./useAppRedux";
// import { useAppSelector } from "./useAppRedux";

// export const useT = () => {
//   const lang = useAppSelector((s) => s.lang.lang);
//   return { lang, t: (key: TKey) => dict[lang][key] };
// };
import { dict } from "../i18n/translations";
import type { TKey } from "../i18n/translations";
import { useAppSelector } from "./useAppRedux";

export const useT = () => {
  const lang = useAppSelector((s) => s.lang.lang);
  return { lang, t: (key: TKey) => dict[lang][key] };
};