$(document).ready(function () { });

let target, ink, d, x, y;
$(".social").click(function (e) {
  target = $(this);

  if (target.find(".ink").length === 0) {
    target.prepend('<span class="ink"></span>');
  }

  ink = target.find(".ink");

  ink.removeClass("animate");

  if (!ink.height() && !ink.width()) {
    d = Math.max(target.outerWidth(), target.outerHeight());
    ink.css({
      height: d,
      width: d
    });
  }

  x = e.pageX - target.offset().left - ink.width() / 2;
  y = e.pageY - target.offset().top - ink.height() / 2;

  ink.css({
    top: y + "px",
    left: x + "px"
  }).addClass("animate");
});


const html = document.documentElement;
const body = document.body;
const menuLinks = document.querySelectorAll(".admin-menu a");
const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
const switchInput = document.querySelector(".switch input");
// const switchLabel = document.querySelector(".switch label");
// const switchLabelText = switchLabel.querySelector("span:last-child");
const collapsedClass = "collapsed";
const lightModeClass = "light-mode";

/*TOGGLE HEADER STATE*/
collapseBtn.addEventListener("click", function () {
  body.classList.toggle(collapsedClass);
  this.getAttribute("aria-expanded") == "true"
    ? (this.setAttribute("aria-expanded", "false"),
      document.querySelector(".admin-menu img").style.display = "none",
      document.querySelector(".admin-menu").style.marginTop = (35).toString() + "px")
    : (this.setAttribute("aria-expanded", "true"),
      document.querySelector(".admin-menu img").style.display = "initial",
      document.querySelector(".admin-menu").style.marginTop = 0);
  this.getAttribute("aria-label") == "collapse menu"
    ? this.setAttribute("aria-label", "expand menu")
    : this.setAttribute("aria-label", "collapse menu");
});

/*TOGGLE MOBILE MENU*/
toggleMobileMenu.addEventListener("click", function () {
  body.classList.toggle("mob-menu-opened");
  this.getAttribute("aria-expanded") == "true"
    ? (this.setAttribute("aria-expanded", "false"),
      document.querySelector(".admin-menu").classList.remove("active"))
    : (this.setAttribute("aria-expanded", "true"),
      document.querySelector(".admin-menu").classList.add("active"),
      document.querySelector(".admin-menu img").style.display = "initial",
      document.querySelector(".admin-menu").style.marginTop = 0);
  this.getAttribute("aria-label") == "open menu"
    ? this.setAttribute("aria-label", "close menu")
    : this.setAttribute("aria-label", "open menu");
});

/*SHOW TOOLTIP ON MENU LINK HOVER*/
for (const link of menuLinks) {
  link.addEventListener("mouseenter", function () {
    if (body.classList.contains(collapsedClass) && window.matchMedia("(min-width: 768px)").matches) {
      const tooltip = this.querySelector("span").textContent;
      this.setAttribute("title", tooltip);
    }
    else {
      this.removeAttribute("title");
    }
  });
}

window.addEventListener('resize', () => {
  window.innerWidth > 767
    ? (body.classList.remove("mob-menu-opened"),
      toggleMobileMenu.setAttribute("aria-expanded", "false"),
      document.querySelector(".admin-menu").classList.remove("active"),
      toggleMobileMenu.setAttribute("aria-label", "close menu"))
    : (body.classList.remove(collapsedClass),
      collapseBtn.setAttribute("aria-expanded", "true"),
      document.querySelector(".admin-menu img").style.display = "initial",
      document.querySelector(".admin-menu").style.marginTop = 0,
      collapseBtn.setAttribute("aria-label", "expand menu"));
});


const backBtn = document.getElementById('back-btn'); //Now
const doctorNavBtn = document.getElementById('doctors-navbtn')
const patientsNavBtn = document.getElementById('patients-navbtn')
const patientContainer = document.getElementById('patients')
const doctorContainer = document.getElementById('doctors')

// doctor section

// approve doctors
const doctorSectionHandlers = document.getElementById('doctor-section-handlers');
const approveDoctorsContainer = document.getElementById('approve-doctors-container');
const approveDoctorsBtn = document.getElementById('approve-doctors');

const doctorCardTemplate = document.getElementById('approve-doctor-template')
const unapprovedDoctorContainer = document.getElementById('unapproveddoctorcontainer');


approveDoctorsBtn.addEventListener('click', async () => {
  backBtn.setAttribute('onclick', 'doctorApproveBackBtn()');
  backBtn.classList.remove('hide');
  doctorSectionHandlers.classList.add('hide');
  approveDoctorsContainer.classList.remove('hide');

  let unapprovedDoctors = []
  unapprovedDoctorContainer.innerHTML = ''
  fetch("/api/doctors/getdoctors").then(res =>
    res.json()).then(d => {
      unapprovedDoctors = d.filter((doctor) => {
        return doctor.approved === false
      })
      doctors = unapprovedDoctors.map(doctor => {
        const card = doctorCardTemplate.content.cloneNode(true).children[0];
        const name = card.querySelector(".doctor-name");
        const rating = card.querySelector('.doctor-rating')
        const fee = card.querySelector('.doctor-fee')
        const category = card.querySelector('.doctor-category')
        const exp = card.querySelector('.doctor-exp')
        const city = card.querySelector('.doctor-city')
        const state = card.querySelector('.doctor-state')
        const btn = card.querySelector('.approveDoctorBtn')
        if (doctor.clinicaddress) {
          const cityname = doctor.clinicaddress.split(',')[0]
          const statename = doctor.clinicaddress.split(',')[1]
          city.textContent = cityname
          state.textContent = statename
        }
        name.textContent = doctor.name
        rating.textContent = doctor.rating
        fee.textContent = doctor.fee
        category.textContent = doctor.category
        exp.textContent = doctor.experience
        btn.setAttribute('onclick', `location.href = '/api/doctors/approve?id=${doctor._id}';`)
        unapprovedDoctorContainer.append(card);
        const avatar = card.querySelector(".avatar")
        avatar.setAttribute('onclick', `this.parentElement.parentElement.classList.toggle("active")`)

      });
    })
})

// const doctorApproveBackBtn = document.getElementById('doctor-approve-back-btn');
function doctorApproveBackBtn() { // Now
  backBtn.removeAttribute('onclick');
  backBtn.classList.add('hide');
  doctorSectionHandlers.classList.remove('hide');
  approveDoctorsContainer.classList.add('hide');
}

// remove doctor

const approveddoctorCardTemplate = document.getElementById('delete-doctor-template')
const approvedDoctorContainer = document.getElementById('deletedoctorcontainer');


const removeDoctorContainer = document.getElementById('remove-doctor-container');
const removeDoctor = document.getElementById('remove-doctor')
removeDoctor.addEventListener('click', () => {
  backBtn.setAttribute('onclick', 'doctorRemoveBackBtn()');
  backBtn.classList.remove('hide');
  doctorSectionHandlers.classList.add('hide');
  removeDoctorContainer.classList.remove('hide');

  let approvedDoctors = []
  approvedDoctorContainer.innerHTML = ''
  fetch("/api/doctors/getdoctors").then(res =>
    res.json()).then(d => {
      approvedDoctors = d.filter((doctor) => {
        return doctor.approved === true
      })
      doctors = approvedDoctors.map(doctor => {
        const card = approveddoctorCardTemplate.content.cloneNode(true).children[0];
        const name = card.querySelector(".doctor-name");
        const rating = card.querySelector('.doctor-rating')
        const fee = card.querySelector('.doctor-fee')
        const category = card.querySelector('.doctor-category')
        const exp = card.querySelector('.doctor-exp')
        const city = card.querySelector('.doctor-city')
        const state = card.querySelector('.doctor-state')
        const btn = card.querySelector('.deleteDoctorBtn')
        if (doctor.clinicaddress) {
          const cityname = doctor.clinicaddress.split(',')[0]
          const statename = doctor.clinicaddress.split(',')[1]
          city.textContent = cityname
          state.textContent = statename
        }
        name.textContent = doctor.name
        rating.textContent = doctor.rating
        fee.textContent = doctor.fee
        category.textContent = doctor.category
        exp.textContent = doctor.experience
        btn.setAttribute('onclick', `location.href = '/api/doctors/deleteDoctor?id=${doctor._id}';`)
        approvedDoctorContainer.append(card);
        const avatar = card.querySelector(".avatar")
        avatar.setAttribute('onclick', `this.parentElement.parentElement.classList.toggle("active")`)
      });
    })
})
// const doctorRemoveBackBtn = document.getElementById('doctor-remove-back-btn');
function doctorRemoveBackBtn() { // Now
  backBtn.removeAttribute('onclick');
  backBtn.classList.add('hide');
  doctorSectionHandlers.classList.remove('hide');
  removeDoctorContainer.classList.add('hide');
}


// doctor list
// const doctorList = document.getElementById('doctor-list');
// const allDoctor = document.getElementById('all-doctors');
// allDoctor.addEventListener('click', () => {
//   backBtn.setAttribute('onclick', 'doctorListBackBtn()');
//   backBtn.classList.remove('hide');
//   doctorSectionHandlers.classList.add('hide');
//   doctorList.classList.remove('hide');
// })
// // const doctorListBackBtn = document.getElementById('doctor-list-back-btn');
// function doctorListBackBtn() { // Now
//   backBtn.removeAttribute('onclick');
//   backBtn.classList.add('hide');
//   doctorSectionHandlers.classList.remove('hide');
//   doctorList.classList.add('hide');
// }



// patient list
const patientCardTemplate = document.getElementById('patient-template')
const patientlistContainer = document.getElementById('patientcontainer');

patientsNavBtn.addEventListener('click', () => {
  backBtn.classList.add('hide');
  backBtn.removeAttribute('onclick');
  doctorContainer.classList.add('hide')
  patientContainer.classList.remove('hide')
  removeDoctorContainer.classList.add('hide');
  approveDoctorsContainer.classList.add('hide');
  // doctorList.classList.add('hide');
})
doctorNavBtn.addEventListener('click', () => {
  backBtn.classList.add('hide');
  backBtn.removeAttribute('onclick');
  doctorContainer.classList.remove('hide');
  patientContainer.classList.add('hide');
  doctorSectionHandlers.classList.remove('hide');
  removeDoctorContainer.classList.add('hide');
  approveDoctorsContainer.classList.add('hide');
  // doctorList.classList.add('hide');
})

fetch("/api/users/getusers")
  .then(res =>
    res.json()).then(d => {
      patientslist = d.map(patient => {
        const card = patientCardTemplate.content.cloneNode(true).children[0];
        const name = card.querySelector(".user-name");
        const gender = card.querySelector('.user-gender')
        const city = card.querySelector('.user-city')
        const appointments = card.querySelector('.user-appointments')
        const state = card.querySelector('.user-state')
        const btn = card.querySelector('.user-delete-btn')
        const adminbtn = card.querySelector('.user-admin-btn')
        appointments.textContent = patient.appointments
        if (patient.address) {
          const cityname = patient.address.split(',')[0]
          const statename = patient.address.split(',')[1]
          city.textContent = cityname
          state.textContent = statename
        }
        name.textContent = patient.name
        gender.textContent = patient.gender

        btn.setAttribute('onclick', `location.href = '/api/users/deleteUser?id=${patient._id}';`)
        if (patient.isAdmin === false) {
          adminbtn.setAttribute('onclick', `location.href = '/api/users/makeadmin?id=${patient._id}'`)
        } else {
          adminbtn.setAttribute('style', 'display:none;')
        }
        patientlistContainer.append(card);
        const avatar = card.querySelector(".avatar")
        avatar.setAttribute('onclick', `this.parentElement.parentElement.classList.toggle("active")`)
      });
    })