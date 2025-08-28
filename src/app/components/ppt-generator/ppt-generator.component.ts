import { Component, OnInit } from '@angular/core';
import { PptGeneratorService, SlideData } from '../../services/ppt-generator.service';

@Component({
  selector: 'app-ppt-generator',
  templateUrl: './ppt-generator.component.html',
  styleUrls: ['./ppt-generator.component.css']
})
export class PptGeneratorComponent implements OnInit {
  slides: SlideData[] = [];
  fileName: string = 'my-presentation';
  isGenerating: boolean = false;

  constructor(private pptService: PptGeneratorService) { }

  ngOnInit(): void {
    this.loadSampleSlides();
  }

  loadSampleSlides(): void {
    this.slides = this.pptService.createSamplePresentation();
  }

  addSlide(): void {
    this.slides.push({
      title: 'New Slide',
      content: 'Add your content here...'
    });
  }

  removeSlide(index: number): void {
    this.slides.splice(index, 1);
  }

  async generatePPT(): Promise<void> {
    if (this.slides.length === 0) {
      alert('Please add at least one slide to generate the presentation.');
      return;
    }

    this.isGenerating = true;
    try {
      await this.pptService.generatePresentation(this.slides, `${this.fileName}.pptx`);
      alert('Presentation generated successfully!');
    } catch (error) {
      console.error('Error generating presentation:', error);
      alert('Error generating presentation. Please try again.');
    } finally {
      this.isGenerating = false;
    }
  }

  trackByIndex(index: number, item: SlideData): number {
    return index;
  }
}
