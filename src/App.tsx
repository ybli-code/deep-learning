import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Terminal, Brain, ExternalLink, Sparkles, Cpu, Paintbrush, BookOpen, Github, FileText, Loader2, GitBranch } from 'lucide-react';
import Docs from './Docs';

interface Resource {
  title: string;
  url: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

interface DocItem {
  id: string;
  title: string;
  description: string;
}

const resources: Resource[] = [
  {
    title: 'Jupyter 在线运行环境',
    url: 'https://jupyter.estart.top',
    description: '无需本地配置，即开即用的在线 Jupyter Notebook 环境，适合快速进行深度学习实验和代码调试。',
    icon: <Terminal className="w-8 h-8 text-cyan-400" />,
    tags: ['环境', '代码', '实验']
  },
  {
    title: '深度神经网络可视化',
    url: 'https://playground.tensorflow.org/#activation=tanh&batchSize=10&dataset=xor&regDataset=reg-plane&learningRate=0.03&regularizationRate=0&noise=0&networkShape=4,4,3&seed=0.70531&showTestData=false&discretize=false&percTrainData=50&x=true&y=true&xTimesY=false&xSquared=true&ySquared=false&cosX=false&sinX=false&cosY=false&sinY=false&collectStats=false&problem=classification&initZero=false&hideText=false',
    description: '通过浏览器交互式探索神经网络，直观理解激活函数、学习率等超参数对模型训练的影响。',
    icon: <Brain className="w-8 h-8 text-purple-400" />,
    tags: ['可视化', '教学', 'TensorFlow']
  },
  {
    title: '图像标注工具',
    url: 'https://www.makesense.ai/',
    description: '免费的在线图像标注工具，支持多种标注类型，是计算机视觉项目数据准备的得力助手。',
    icon: <Paintbrush className="w-8 h-8 text-green-400" />,
    tags: ['数据', '标注', 'CV']
  },
  {
    title: 'TensorFlow 教程',
    url: 'https://www.runoob.com/tensorflow/tensorflow-tutorial.html',
    description: '菜鸟教程提供的 TensorFlow 入门指南，内容清晰，适合初学者快速上手深度学习框架。',
    icon: <BookOpen className="w-8 h-8 text-orange-400" />,
    tags: ['教程', '入门', 'TensorFlow']
  }
];

function HomePage() {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/docs/docs.json')
      .then((res) => res.json())
      .then((data) => {
        setDocs(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-cyan-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <header className="mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-400 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>威海海洋职业学院</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            深度学习<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              资源库
            </span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
            精选深度学习资源集合。探索神经网络可视化工具与开箱即用的实验环境，加速你的 AI 学习之旅。
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-cyan-400" />
            文档教程
          </h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {docs.map((doc) => (
                <Link
                  key={doc.id}
                  to={`/docs/${encodeURIComponent(doc.id)}`}
                  className="group relative p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800">
                      <FileText className="w-6 h-6 text-cyan-400" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {doc.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {doc.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">在线资源</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 shadow-inner">
                    {resource.icon}
                  </div>
                  <ExternalLink className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {resource.title}
                </h2>
                
                <p className="text-neutral-400 leading-relaxed mb-8 min-h-[4rem]">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-neutral-950 text-neutral-300 border border-neutral-800 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer className="mt-32 pt-8 border-t border-neutral-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-500 text-sm">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>李宜兵</span>
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/ybli-code/deep-learning" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://gitee.com/ybli_code/deep-learning" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              <span>Gitee</span>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs/:id" element={<Docs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
