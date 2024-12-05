## 复现步骤 STEPS TO REPRODUCE

```bash
pnpm install
pnpm run dev
```

在浏览器中访问 `http://localhost:8020/#/?p=eyJ1c2VybmFtZSI6ImRlbW8zIiwiZGluZ3RhbGtfdXNlcl9pZCI6IjIyNDYyMTMwMzgyNTg2MTI1NyJ9` 即可看到页面。

Open `http://localhost:8020/#/?p=eyJ1c2VybmFtZSI6ImRlbW8zIiwiZGluZ3RhbGtfdXNlcl9pZCI6IjIyNDYyMTMwMzgyNTg2MTI1NyJ9` in your browser to see the page.

使用webstorm打开项目，把 `aaa_user_id` 全局替换成其他字符串，rsbuild极可能会停止服务

Open the project with WebStorm and replace `aaa_user_id` with another string globally. RSBuild will most likely stop serving.

并不会经常性的全局替换字符串，只是这样比较容易触发rsbuild的bug

Not often, just replace the string globally to trigger the bug of rsbuild.

## 错误日志 ERROR LOG

```
/rsbuild_demo pnpm run dev

> rsbuild_demo@1.0.0 dev D:\Projects\rsbuild_demo
> rsbuild dev

  Rsbuild v1.1.7

  ➜ Network:  http://192.168.1.16:8020/
  ➜ Local:    http://localhost:8020/
  ➜ press h + enter to show shortcuts

start   Building...
ready   Built in 0.72 s (web)
start   Building...
ready   Built in 0.10 s (web)
start   Building...
D:\Projects\rsbuild_demo\node_modules\.pnpm\@rspack+core@1.1.4_@swc+helpers@0.5.15\node_modules\@rspack\core\dist\index.js:2807
      (d) => __privateGet(this, _inner).addFileDependencies(d)
                                        ^

Error: Unable to access compilation with id = CompilationId(15) now. The compilation have been removed on the Rust side. The latest compilation id is CompilationId(19)
    at MergeCaller.callFn (D:\Projects\rsbuild_demo\node_modules\.pnpm\@rspack+core@1.1.4_@swc+helpers@0.5.15\node_modules\@rspack\core\dist\index.js:2807:41)
    at MergeCaller.finalCall [as _onTimeout] (D:\Projects\rsbuild_demo\node_modules\.pnpm\@rspack+core@1.1.4_@swc+helpers@0.5.15\node_modules\@rspack\core\dist\index.js:2672:12)
    at listOnTimeout (node:internal/timers:594:17)
    at process.processTimers (node:internal/timers:529:7) {
  code: 'GenericFailure'
}

Node.js v22.11.0
```
