import { ComponentType } from 'react';

import LuminescentMaterialsSlides from './luminescent-materials/index';
import SampleSlides from './sample/index';

export interface PresentationDefinition {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  department: string;
  thumbnail: string;
  date: string;
  slides: number;
  component: ComponentType;
}

export const presentations: PresentationDefinition[] = [
  {
    id: 'luminescent-materials',
    title: '新能源光织物研究',
    subtitle: '新能源光织物的开发及其在主动光安全系统中的应用',
    author: '田甜教授',
    department: '扬州大学',
    thumbnail: '/images/bj.jpg',
    date: '2024年',
    slides: 3,
    component: LuminescentMaterialsSlides,
  },
  {
    id: 'sample-presentation',
    title: '示例演示文稿',
    subtitle: '这是一个示例演示文稿的描述',
    author: '示例作者',
    department: '示例单位',
    thumbnail: '/images/chart.png',
    date: '2024年',
    slides: 4,
    component: SampleSlides,
  },
];

export const presentationMap = presentations.reduce<Record<string, PresentationDefinition>>(
  (acc, presentation) => {
    acc[presentation.id] = presentation;
    return acc;
  },
  {},
);
