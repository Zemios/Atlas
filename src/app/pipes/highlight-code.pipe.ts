import { Pipe, PipeTransform } from '@angular/core';
import hljs from 'highlight.js';

@Pipe({
  name: 'highlightCode',
})
export class HighlightCodePipe implements PipeTransform {
  transform(content: string): string {
    const regex = /``([\s\S]*?)``/g;
    const highlighted = content.replace(regex, (match, codeContent) => {
      const highlightedCode = hljs.highlightAuto(codeContent.trim()).value;
      return `<pre class="bg-gray-100 p-3 rounded"><code class="whitespace-pre-wrap">${highlightedCode}</code></pre>`;
    });

    return highlighted;
  }
}
