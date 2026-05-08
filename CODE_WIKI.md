# 深度学习资源库 - Code Wiki

## 项目概述

**项目名称**: 深度学习资源库 (deep-learning)

**项目类型**: React + TypeScript + Vite 构建的深度学习教育资源网站

**项目描述**: 威海海洋职业学院的深度学习资源集合平台，提供文档教程、Jupyter Notebook 实验资源、在线学习工具链接等。

**技术栈**:

- 前端框架: React 19.2.4
- 构建工具: Vite 8.0.1
- 语言: TypeScript 5.9.3
- 路由: React Router DOM 7.14.0
- 样式: Tailwind CSS 4.2.2
- 图标: Lucide React 0.577.0
- Markdown 渲染: React Markdown 10.1.0

---

## 项目架构

```
deep-learning/
├── public/                    # 静态公共资源
│   ├── docs/                  # Markdown 文档文件
│   │   ├── docs.json           # 文档索引配置
│   │   └── *.md               # 教程文档
│   ├── notebooks/             # Jupyter Notebook 文件
│   └── icons.svg, favicon.svg # 图标资源
├── src/                       # 源代码目录
│   ├── main.tsx              # React 应用入口
│   ├── App.tsx               # 主应用组件（路由配置）
│   ├── Docs.tsx              # 文档查看组件
│   ├── index.css            # 全局样式
│   ├── App.css              # 应用样式
│   └── assets/              # 图片资源
├── index.html                # HTML 入口文件
├── package.json              # 项目依赖配置
├── vite.config.ts            # Vite 构建配置
├── tsconfig.json             # TypeScript 配置
└── eslint.config.js         # ESLint 代码规范配置
```

---

## 主要模块职责

### 1. 入口模块

#### `src/main.tsx`

**职责**: React 应用启动入口

**核心功能**:

- 使用 `createRoot` 创建 React 18+ 的并发模式根节点
- 使用 `StrictMode` 启用开发环境检查
- 导入全局样式和主应用组件

**关键代码**:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

### 2. 应用主模块

#### `src/App.tsx`

**职责**: 应用主组件，包含路由配置和首页布局

**核心功能**:

- 路由管理（使用 React Router DOM）
- 首页 UI 渲染
- 文档列表加载
- Jupyter Notebook 资源展示
- 外部资源链接展示
- 页面底部信息展示

**组件结构**:

| 组件名 | 类型 | 描述 |
|--------|------|------|
| `HomePage` | 函数组件 | 首页主组件 |
| `App` | 函数组件 | 路由配置组件 |

**数据结构**:

```typescript
interface Resource {
  title: string;       // 资源标题
  url: string;         // 资源链接
  description: string; // 资源描述
  icon: React.ReactNode; // 图标组件
  tags: string[];      // 标签数组
}

interface DocItem {
  id: string;         // 文档ID
  title: string;      // 文档标题
  description: string; // 文档描述
}

interface NotebookItem {
  id: string;         // Notebook ID
  title: string;      // Notebook 标题
  description: string; // 描述
  filename: string;   // 文件名
}
```

**状态管理**:

- `docs`: 文档列表（从 `/docs/docs.json` 加载）
- `loading`: 加载状态
- 使用 `useEffect` 钩子从 API 获取文档列表

**路由配置**:

```typescript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/docs/:id" element={<Docs />} />
  </Routes>
</BrowserRouter>
```

---

### 3. 文档查看模块

#### `src/Docs.tsx`

**职责**: Markdown 文档渲染和展示

**核心功能**:

- 根据 URL 参数动态加载 Markdown 文档
- Markdown 内容渲染（支持 GFM 语法）
- 文档标题映射
- 加载状态和错误处理

**关键函数**:

| 函数名 | 描述 | 参数 |
|--------|------|------|
| `getTitle()` | 获取文档显示标题 | 无，返回 string |

**标题映射配置**:

```typescript
const titles: Record<string, string> = {
  '1-TensorFlow 教程': 'TensorFlow 教程',
  '2-测试页面': '测试页面',
  'TensorFlow_教程_菜鸟教程_20260320173744': 'TensorFlow 教程 (菜鸟教程)'
};
```

**Markdown 渲染配置**:

- 使用 `ReactMarkdown` 组件
- 使用 `remark-gfm` 插件支持 GitHub Flavored Markdown
- 自定义渲染样式（代码块、引用、标题等）

---

### 4. 样式模块

#### `src/index.css`

**职责**: 全局样式和 Tailwind CSS 导入

**核心配置**:

- Tailwind CSS v4 导入
- CSS 变量定义（字体、颜色）
- 响应式字体渲染优化
- 暗黑/亮色主题支持

#### `src/App.css`

**职责**: 应用特定样式（目前为空）

---

## 依赖关系

### 生产依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `@tailwindcss/vite` | ^4.2.2 | Tailwind CSS Vite 插件 |
| `lucide-react` | ^0.577.0 | 图标库 |
| `react` | ^19.2.4 | React 核心库 |
| `react-dom` | ^19.2.4 | React DOM 渲染库 |
| `react-markdown` | ^10.1.0 | Markdown 渲染组件 |
| `react-router-dom` | ^7.14.0 | React 路由管理 |
| `remark-gfm` | ^4.0.1 | GitHub Flavored Markdown 插件 |

### 开发依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `@eslint/js` | ^9.39.4 | ESLint JavaScript 支持 |
| `@types/node` | ^24.12.0 | Node.js 类型定义 |
| `@types/react` | ^19.2.14 | React 类型定义 |
| `@types/react-dom` | ^19.2.3 | React DOM 类型定义 |
| `@vitejs/plugin-react` | ^6.0.1 | Vite React 插件 |
| `autoprefixer` | ^10.4.27 | CSS 前缀自动补全 |
| `eslint` | ^9.39.4 | 代码规范检查 |
| `eslint-plugin-react-hooks` | ^7.0.1 | React Hooks 规范检查 |
| `eslint-plugin-react-refresh` | ^0.5.2 | 热更新规范检查 |
| `globals` | ^17.4.0 | 全局变量定义 |
| `postcss` | ^8.5.8 | CSS 后处理器 |
| `tailwindcss` | ^4.2.2 | CSS 框架 |
| `typescript` | ~5.9.3 | TypeScript 语言 |
| `typescript-eslint` | ^8.57.0 | TypeScript ESLint 支持 |
| `vite` | ^8.0.1 | 构建工具 |

---

## 关键类与函数说明

### HomePage 组件

```typescript
function HomePage() {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);
  // ...
}
```

**功能**:

1. 页面初始化时从 `/docs/docs.json` 获取文档列表
2. 渲染文档卡片列表（链接到文档详情页）
3. 渲染 Jupyter Notebook 下载/运行入口
4. 渲染外部资源链接卡片

### Docs 组件

```typescript
function Docs() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>('');
  // ...
}
```

**功能**:

1. 从 URL 参数获取文档 ID
2. 根据 ID 动态加载对应的 Markdown 文件
3. 使用 ReactMarkdown 渲染 Markdown 内容
4. 提供返回首页导航

### getTitle 函数

```typescript
const getTitle = () => {
  if (!id) return '';
  const decodedId = decodeURIComponent(id);
  const titles: Record<string, string> = { /* ... */ };
  return titles[decodedId] || decodedId;
};
```

**功能**: 将文档 ID 转换为用户友好的显示标题

---

## 配置说明

### Vite 配置 (`vite.config.ts`)

```typescript
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    host: '0.0.0.0'
  }
})
```

**说明**:

- 使用 Tailwind CSS 和 React 插件
- 开发服务器监听所有网络接口（支持远程访问）

### TypeScript 配置

项目使用项目引用（project references）模式:

- `tsconfig.app.json`: 应用代码配置
- `tsconfig.node.json`: Node.js 代码配置（如 Vite 配置）

### ESLint 配置

使用 Flat Config 模式，集成:

- React Hooks 规则检查
- React Refresh 规则检查
- TypeScript 支持

---

## 项目运行方式

### 环境要求

- Node.js 18+ 版本

### 安装步骤

```bash
# 1. 安装 Node.js (如未安装)
# 下载地址: https://nodejs.org/zh-cn/download

# 2. 安装项目依赖
npm install
```

### 开发环境运行

```bash
# 启动开发服务器
npm run dev

# 服务启动后访问 http://localhost:5173
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 代码检查

```bash
# 运行 ESLint 检查
npm run lint
```

---

## 静态资源说明

### 文档资源 (`public/docs/`)

| 文件 | 描述 |
|------|------|
| `docs.json` | 文档索引，包含所有文档的元数据 |
| `1-TensorFlow 教程.md` | TensorFlow 基础教程 |
| `2-测试页面.md` | 测试文档 |
| `3-测试.md` | 测试文档 |
| `4-图像分类.md` | 图像分类教程 |
| `TensorFlow_教程_菜鸟教程_*.md` | 菜鸟教程 TensorFlow 教程 |

### Notebook 资源 (`public/notebooks/`)

| 文件 | 描述 |
|------|------|
| `1-TensorFlow张量操作.ipynb` | TensorFlow 张量操作教程 Notebook |

### 文档索引格式 (`docs.json`)

```json
[
  {
    "id": "1-TensorFlow 教程",
    "title": "TensorFlow 教程",
    "description": "TensorFlow 基础入门教程"
  }
]
```

---

## 外部资源链接

| 资源名称 | URL | 用途 |
|----------|-----|------|
| Jupyter 在线运行环境 | https://jupyter.estart.top | 在线运行 Notebook |
| 深度神经网络可视化 | https://playground.tensorflow.org | 神经网络可视化教学 |
| 图像标注工具 | https://www.makesense.ai/ | 数据标注 |
| TensorFlow 教程 | https://www.runoob.com/tensorflow/tensorflow-tutorial.html | 菜鸟教程 TensorFlow |

---

## 开发指南

### 添加新文档

1. 在 `public/docs/` 目录下创建 Markdown 文件
2. 在 `public/docs/docs.json` 中添加文档索引条目
3. 刷新页面即可看到新文档

### 添加新资源链接

在 `App.tsx` 的 `resources` 数组中添加新对象:

```typescript
const resources: Resource[] = [
  {
    title: '新资源标题',
    url: 'https://example.com',
    description: '资源描述',
    icon: <NewIcon className="w-8 h-8 text-color" />,
    tags: ['标签1', '标签2']
  }
];
```

### 添加新 Notebook

1. 将 `.ipynb` 文件放入 `public/notebooks/` 目录
2. 在 `App.tsx` 的 `notebooks` 数组中添加条目

---

## 部署说明

### Vercel 部署

项目已配置 `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/docs/(.*)", "destination": "/docs/$1" },
    { "source": "/notebooks/(.*)", "destination": "/notebooks/$1" }
  ]
}
```

### GitHub Pages 部署

构建后的 `dist` 目录可以直接部署到 GitHub Pages。

---

## 贡献指南

1. Fork 本仓库
2. 克隆 Fork 后的仓库到本地
3. 创建新分支进行开发
4. 提交代码并推送
5. 创建 Pull Request

---

## 常见问题

### npm 命令无法识别

**问题**: `npm: 无法加载 *.ps1，因为系统禁止...`

**解决方案**: 在 PowerShell（管理员）中运行:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Node 命令无法识别

**问题**: 无法将 'npm' 识别为...

**原因**:

1. 未安装 Node.js 或未加入环境变量
2. 先打开编辑器，后安装的 Node.js

**解决方案**:

- 原因1: 重新安装 Node.js
- 原因2: 重启编辑器

---

## 作者信息

- **作者**: 李宜兵
- **机构**: 威海海洋职业学院
- **GitHub**: https://github.com/ybli-code/deep-learning
- **Gitee**: https://gitee.com/ybli_code/deep-learning
