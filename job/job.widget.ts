import mustache from '../mustache'
import fetch from '../fetch'
import './job.widget.scss' 

// Define environment variables that will be pulled into the build (must be in sync with build.js)
declare var SERVICE_URL: string;

// Options for the widget
export interface JobWidgetOptions {
    username?: string
}

export default class JobWidget {

    data: any

    template = `
        <div class="card">
            <h1><em>{{login}}</em></h1>
            <img src="{{avatar_url}}">
        </div>
    `

    constructor(private element: HTMLElement, private options: JobWidgetOptions) {
        this.render();
    }

    async render() {
        this.data = JSON.parse(await fetch((SERVICE_URL || 'https://api.github.com') + '/users/' + this.options.username))
        this.element.innerHTML = mustache(this.template, this.data)
    }
    
    // Factory initializer
    static init(element: HTMLElement, options: JobWidgetOptions): JobWidget {
        return new JobWidget(element, options);


    }
}


/**
 * Initialize an widgets found on the page
 */
let widgets = document.getElementsByTagName('job-widget')
for (let i = 0; i< widgets.length; i++) {
    JobWidget.init(<HTMLElement>widgets[i], <JobWidgetOptions> {
        username: widgets[i].attributes['username'].value
    })   
}
