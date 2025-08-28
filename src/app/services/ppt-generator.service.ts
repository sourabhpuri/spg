import { Injectable } from '@angular/core';

export interface SlideData {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class PptGeneratorService {

  constructor() { }

  async generatePresentation(slides: SlideData[], fileName: string = 'presentation.pptx'): Promise<void> {
    try {
      // Create a simple PowerPoint-like XML structure
      const pptxContent = this.createPowerPointXML(slides, fileName);
      
      // Create a Blob and download
      const blob = new Blob([pptxContent], { 
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
      });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName.endsWith('.pptx') ? fileName : `${fileName}.pptx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error in generatePresentation:', error);
      throw new Error('Failed to generate PowerPoint presentation. Please try again.');
    }
  }

  private createPowerPointXML(slides: SlideData[], fileName: string): string {
    // Create a simplified XML structure that looks like a PowerPoint presentation
    // Note: This creates a basic XML file, not a true PPTX
    const slideElements = slides.map((slide, index) => `
    <slide number="${index + 1}">
      <title>${this.escapeXML(slide.title)}</title>
      <content>${this.escapeXML(slide.content)}</content>
    </slide>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<presentation>
  <metadata>
    <title>${this.escapeXML(fileName.replace('.pptx', ''))}</title>
    <author>SPG Presentation Generator</author>
    <company>SPG</company>
    <created>${new Date().toISOString()}</created>
  </metadata>
  <slides>${slideElements}
  </slides>
</presentation>`;
  }

  private escapeXML(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  createSamplePresentation(): SlideData[] {
    return [
      {
        title: 'Welcome to SPG Presentation Generator',
        content: 'This is the first slide of your presentation. You can customize the title and content to create professional presentations.'
      },
      {
        title: 'Features',
        content: '• Easy to use interface\n• Custom slide creation\n• Professional templates\n• Download as PowerPoint file'
      },
      {
        title: 'Get Started',
        content: 'Start creating your presentation by adding slides with custom titles and content. Click the "Generate PPT" button when ready.'
      }
    ];
  }
}