'use strict'
import {Header, print} from "./components/header.mjs"

const rootElement = document.getElementById('root');
const headerElement = document.createElement('nav');
rootElement.appendChild(headerElement);

const header = new Header(headerElement);
header.render()
