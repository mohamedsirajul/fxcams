import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment } from 'pdfmake/interfaces';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;




interface DocumentDefinition {
  content: any[];
  styles: {
    [key: string]: {
      fontSize?: number;
      bold?: boolean;
      alignment?: Alignment;
      margin?: [number, number, number, number];
      decoration?: string;
    };
  };
  images : any;
  defaultStyle?: {
    fontSize?: number;
    bold?: boolean;
    alignment?: Alignment;
    margin?: [number, number, number, number];
    pageOrientation?: string;
  };
  layout?: {
    fillColor?: (rowIndex: number, node: any) => string | null;
    hLineColor?: (rowIndex: number, node: any) => string;
    vLineColor?: (rowIndex: number, node: any) => string;
    hLineWidth?: (rowIndex: number, node: any) => number;
    vLineWidth?: (rowIndex: number, node: any) => number;
    pageSize?: string | [number, number];
  };
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  userInfo: any[] = [];
  actualdata : any = {};
  val_edit_elements: any;
  dataSource: any;

  // foods: Food[] = [
  //   {dept: 'steak-0', viewValue: 'Steak'},
  //   {dept: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'},
  // ];

  public constructor(private http: HttpClient) {}
  displayedColumns: string[] = ['position', 'register', 'studentname', 'action'];
  public ngOnInit() {
    this.dataSource = new MatTableDataSource();
    const url: string = '/assets/db.json';
    this.http.get<any[]>(url).subscribe((response) => {
      this.userInfo = response;
      console.log(this.userInfo);
      this.dataSource.data = this.userInfo;

    });
  }

  generate_tc(element:any) {
  
    console.log(element);
    this.val_edit_elements = element;
    

    this.actualdata={
      tc_no: this.userInfo[this.val_edit_elements].tc_no,
      admission_no: this.userInfo[this.val_edit_elements].admission_no,
      name_student: this.userInfo[this.val_edit_elements].name_student,
      name_parent: this.userInfo[this.val_edit_elements].name_parent,
      nationality: this.userInfo[this.val_edit_elements].nationality,
      caste:this.userInfo[this.val_edit_elements].caste,
      gender: this.userInfo[this.val_edit_elements].gender,
      dob: this.userInfo[this.val_edit_elements].dob,
      dob_txt: this.userInfo[this.val_edit_elements].dob_txt,
      personal_identification: this.userInfo[this.val_edit_elements].personal_identification,
      year_of_admission: this.userInfo[this.val_edit_elements].year_of_admission,
      course_studying: this.userInfo[this.val_edit_elements].course_studying,
      qualified_for_promotion: this.userInfo[this.val_edit_elements].qualified_for_promotion,
      date_on_left_the_institution: this.userInfo[this.val_edit_elements].date_on_left_the_institution,
      date_of_application_for_tc: this.userInfo[this.val_edit_elements].date_of_application_for_tc,
      date_of_issue_of_tc: this.userInfo[this.val_edit_elements].date_of_issue_of_tc,
      reason_for_leaving: this.userInfo[this.val_edit_elements].reason_for_leaving
    }
    console.log(this.actualdata);
    

    

    const documentDefinition: DocumentDefinition = {
      content: [
        {
          columns: [
            {
              image: 'logoo', 
              fit: [200, 100],
              margin: [0, 5],
            },
            {
              canvas: [{ type: 'rect', x: 155, y: 10, w: 0.5, h: 45,color: 'grey'  }], // Vertical line
              width: 2, // Adjust the width of the canvas to control the thickness of the line
            },
            {
              text: 'Ambai Road,Tharuvai - 627 356 \n Tirunelveli District, Tamil Nadu \n \n Email : principal@fxpoly.ac.in \n Web    : www.fxpoly.ac.in \n Phone: +91 8012551442',
              style: 'subheader',
              width: '*',
              alignment: 'left', // Align the text to the left
              fontSize: 6.5,
              color: '#1A1110',
              margin: [165, 10, 0, 70], // Add left margin of 40 units to move the text to the right
            },
          ],
        },
        { text: 'TRANSFER CERTIFICATE',  style: 'header', color: '#1A1110', decoration: 'underline' },
        { text: '', margin: [0, 8] },
        {
          columns: [
            { text: 'TC No:' +this.userInfo[this.val_edit_elements].tc_no, style: 'subheader', color: '#1A1110', fontSize: 10 },
            {
              text: 'Admission No:' + this.userInfo[this.val_edit_elements].admission_no,
              style: 'subheader',
              width: '*',
              alignment: 'right',
              fontSize: 10,
              color: '#1A1110',
              margin: [0, 0, 80, 0], 
            },
          ],
        },
        { text: '', margin: [0, 5] },
        {
          table: {
            widths: [215, '*'],
            body: [
              [' 1. Name of the Student',
              { text: this.userInfo[this.val_edit_elements].name_student, style: 'boldText' },
             ],
              [' 2. Name of the Parent / Guardian',
               { text: this.userInfo[this.val_edit_elements].name_parent },
              ],
              [' 3. Nationality / Religion', this.userInfo[this.val_edit_elements].nationality ],
              [' 4. Caste & Commmunity', this.userInfo[this.val_edit_elements].caste],
              [' 5. Gender', this.userInfo[this.val_edit_elements].gender ],
              [
                {
                  text: '6. Date of Birth according to Admission Register',
                  fontSize: 12,
                  rowSpan: 2,
                },
                {
                  stack: [
                    {
                      text: this.userInfo[this.val_edit_elements].dob,
                      fontSize: 12,
                    },
                  ],
                },
              ],   
              ['',this.userInfo[this.val_edit_elements].dob_txt],
              ['7. Personal Marks of Identification' , this.userInfo[this.val_edit_elements].personal_identification],
              [' 8. Year of Admission', this.userInfo[this.val_edit_elements].year_of_admission],
              [' 9. Course in which the students was studying at the time of leaving', 
              { text: this.userInfo[this.val_edit_elements].course_studying, style: 'boldText' },
            ],
              [' 10. Whether qualified for promotion to higher studies', this.userInfo[this.val_edit_elements].qualified_for_promotion],
              [' 11. Date on Which the candidate actually left the Institution', this.userInfo[this.val_edit_elements].date_on_left_the_institution],
              [' 12. Date of Application for Transfer Certificate', this.userInfo[this.val_edit_elements].date_of_application_for_tc],
              [' 13. Date of issue of Transfer Certificate', this.userInfo[this.val_edit_elements].date_of_issue_of_tc],
              [' 14. Reason for leaving', this.userInfo[this.val_edit_elements].reason_for_leaving],
              [' 15. Character & Conduct', ''],
            ]
          }
        },
      ],
      images: {
        logoo: {
          url: window.origin+'/assets/img/9507-mainlogo.png',
        }
      },
      styles: {
        mainheader: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
          decoration: 'underline'
        },
        header: {
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        paragraphStyle: {
          fontSize: 12,
          bold: false,
          alignment: 'left',
          margin: [0, 5, 0, 5]
        },
        tableHeader: {
          fontSize: 14,
          // bold: true,
          alignment: 'center',
          margin: [0, 10, 0, 5]
        },
        boldText: {
          bold: true
        }
      }
    };

    // Create an empty PDF and open it in a new tab
    (pdfMake as any).createPdf(documentDefinition).open();
  }

}
