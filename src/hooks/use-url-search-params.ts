import { pick } from "lodash-es";
import qs from "qs";
import { useCallback, useEffect, useState } from "react";

export const useUrlSearchParams = (
  monitorProps?: string[],
  // 是否禁用 URL 参数监控
  disabled?: boolean,
): [Record<string, any>, (params: Record<string, any>) => void] => {
  // 获取当前 URL 参数并解析
  const getParams = useCallback(() => {
    if (disabled === true) {
      return {};
    }

    const result = qs.parse(
      typeof window !== "undefined" ? window.location.search : "",
      { ignoreQueryPrefix: true },
    );

    if (typeof monitorProps !== "undefined" && monitorProps.length > 0) {
      return pick(result, monitorProps);
    }

    return result;
  }, [monitorProps, disabled]);

  // 获取当前 searchParams
  const [searchParams, setSearchParams] =
    useState<Record<string, any>>(getParams);

  // 更新 URL 的 searchParams
  const updateSearchParams = useCallback(
    (newParams: Record<string, any>): void => {
      if (disabled === true) {
        return;
      }

      const stringified = qs.stringify(newParams, {
        addQueryPrefix: true,
      });

      const newUrl = `${window.location.pathname}${stringified}`;

      window.history.pushState({}, "", newUrl);
      window.dispatchEvent(new Event("urlchange"));
    },
    [disabled],
  );

  // 监听 popstate + pushState/replaceState
  useEffect(() => {
    const handleChange = (): void => {
      setSearchParams(getParams());
    };

    const originalPush = history.pushState;
    const originalReplace = history.replaceState;

    if (disabled !== true) {
      // 拦截 pushState / replaceState
      const wrapHistoryMethod = (
        method: "pushState" | "replaceState",
      ): ((this: History, ...args: any[]) => void) => {
        const original = history[method];

        return function (this: History, ...args: any[]) {
          // @ts-expect-error 忽略类型错误
          // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
          const result = original.apply(this, args);
          window.dispatchEvent(new Event("urlchange"));
          return result;
        };
      };

      history.pushState = wrapHistoryMethod("pushState");
      history.replaceState = wrapHistoryMethod("replaceState");

      window.addEventListener("popstate", handleChange);
      window.addEventListener("urlchange", handleChange);
    }

    return () => {
      if (disabled !== true) {
        history.pushState = originalPush;
        history.replaceState = originalReplace;
        window.removeEventListener("popstate", handleChange);
        window.removeEventListener("urlchange", handleChange);
      }
    };
  }, [getParams, disabled]);

  return [searchParams, updateSearchParams];
};
