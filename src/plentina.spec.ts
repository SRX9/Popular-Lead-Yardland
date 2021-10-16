import { Test, TestingModule } from '@nestjs/testing';
import { Circle } from './models/circle.model';
import { Line } from './models/line.model';
import { Rect } from './models/rect.model';
import { PlentinaController } from './plentina.controller';
import { PlentinaService } from './plentina.service';

describe('PlentinaController', () => {
  let plentinaController: PlentinaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlentinaController],
      providers: [PlentinaService],
    }).compile();

    plentinaController = app.get<PlentinaController>(PlentinaController);
  });

  describe('root', () => {
    it("should return Applicant's Full Name", () => {
      expect(new PlentinaService().healthCheck()).toBe(
        'Raj Kishorbhai Savaliya',
      );
    });
  });
});

describe('PlentinaService', () => {
  let plentinaService: PlentinaService;

  beforeEach(async () => {
    plentinaService = new PlentinaService();
  });

  describe('doesCircle-RectAndLineCollide', () => {
    const circle = new Circle(10, 10, 2);

    describe('a colliding circle and rectangle', () => {
      const rectangle = new Rect(9, 9, 1, 1);

      it('should return true', () => {
        expect(circle.collides(rectangle)).toBeTruthy;
      });

      it('should return true', () => {
        expect(rectangle.collides(circle)).toBeTruthy;
      });
    });

    describe('a colliding circle and line', () => {
      const line = new Line(9, 9, 10);

      it('should return true', () => {
        expect(circle.collides(line)).toBeTruthy;
      });

      it('should return true', () => {
        expect(line.collides(circle)).toBeTruthy;
      });
    });

    describe('a non-colliding circle and rectangle', () => {
      const rectangle = new Rect(5, 5, 2, 2);

      it('should return false', () => {
        expect(circle.collides(rectangle)).toBeFalsy;
      });

      it('should return false', () => {
        expect(rectangle.collides(circle)).toBeFalsy;
      });
    });
  });

  describe('doesCircleAndCircleCollide', () => {
    const circle1 = new Circle(10, 10, 1);

    describe('two colliding circles', () => {
      [
        new Circle(12, 10, 1),
        new Circle(10, 12, 1),
        new Circle(11, 11, 1),
      ].forEach((circle2) => {
        it(`should return true for ${JSON.stringify(circle2)}`, () => {
          expect(circle1.collides(circle2)).toBeTruthy;
        });
      });
    });

    describe('two non-colliding circles', () => {
      const circle2 = new Circle(5, 5, 1);

      it(`should return false for ${JSON.stringify(circle2)}`, () => {
        expect(circle1.collides(circle2)).toBeFalsy;
      });
    });
  });

  describe('doesRectAndRectCollide', () => {
    const rectangle1 = new Rect(9, 9, 1, 1);

    describe('two colliding rectangles', () => {
      const rectangle2 = new Rect(10, 10, 2, 2);
      it('should return true', () => {
        expect(rectangle1.collides(rectangle2)).toBeTruthy;
      });
    });

    describe('two non-colliding rectangles', () => {
      const rectangle2 = new Rect(4, 4, 2, 2);
      it('should return false', () => {
        expect(rectangle1.collides(rectangle2)).toBeFalsy;
      });
    });
  });

  describe('doesRectAndLineCollide', () => {
    const rectangle1 = new Rect(9, 9, 1, 1);

    describe('line and colliding rectangles', () => {
      const line = new Line(10, 10, 20);
      it('should return true', () => {
        expect(rectangle1.collides(line)).toBeTruthy;
      });
    });
  });

  describe('doesLineAndLineCollide', () => {
    const line1 = new Line(9, 9, 10);

    describe('two colliding Lines', () => {
      const line2 = new Line(10, 10, 20);
      it('should return true', () => {
        expect(line1.collides(line2)).toBeTruthy;
      });
    });
  });
});
