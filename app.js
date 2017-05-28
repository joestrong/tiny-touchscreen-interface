"use strict"
const fs = require('fs')
const spawn = require('child_process').spawn

class Menu {

  constructor() {
    this.container = document.querySelector('.container')
    this.loadConfig(() => {
      this.constructMenu()
    })
    this.initEvents()
  }

  initEvents() {
    this.container.addEventListener('click', this.buttonClick.bind(this))
  }

  loadConfig(callback) {
    fs.readFile('./config.json', (err, data) => {
      if (err) throw err
      this.config = JSON.parse(data)
      callback.call()
    })
   }

  constructMenu() {
    if (this.config.buttons) {
      for (let i = 0; i < this.config.buttons.length; i++) {
        const button = this.config.buttons[i]
        let el = document.createElement('div')
        el.textContent = button.label
        el.classList.add('button')
        el.setAttribute('data-command', button.command)
        this.container.appendChild(el)
      }
    }
  }

  buttonClick(e) {
    if (!e.target.classList.contains('button')) {
      return
    }

    this.runCommand(e.target.getAttribute('data-command'))
  }

  runCommand(commandString) {
    const args = commandString.split(' ')
    const command = args.splice(0, 1)[0]
    spawn(command, args)
  }
}

new Menu()
