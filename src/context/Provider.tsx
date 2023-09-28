import { ComponentClass, ReactNode } from 'react';
import { useQuizContext } from './QuizContext';

export const composeProviders =
    (...providers: any) =>
    ({ children }: { children: ReactNode }) =>
        providers.reduceRight((child: ReactNode, ProviderWrapper: ComponentClass) => <ProviderWrapper>{child}</ProviderWrapper>, children);

const Provider = composeProviders(useQuizContext);

export default Provider;
