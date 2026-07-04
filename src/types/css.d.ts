/**
 * Type declaration cho plain CSS imports (global stylesheets).
 * Ngăn VS Code / TypeScript language server báo lỗi
 * "Cannot find module '*.css'" khi import CSS side-effect.
 */
declare module "*.css";
