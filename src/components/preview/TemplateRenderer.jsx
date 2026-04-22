import { MinimalTemplate } from './templates/MinimalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { TraditionalTemplate } from './templates/TraditionalTemplate';

const templateMap = {
  minimal: MinimalTemplate,
  modern: ModernTemplate,
  creative: CreativeTemplate,
  traditional: TraditionalTemplate,
};

export function TemplateRenderer(props) {
  const TemplateComponent = templateMap[props.activeTemplate] || ModernTemplate;
  return <TemplateComponent {...props} />;
}