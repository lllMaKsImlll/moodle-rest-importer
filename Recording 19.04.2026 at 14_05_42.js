const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1905,
            height: 191
        })
    }
    {
        const targetPage = page;
        await targetPage.goto('https://dev01-moodle.susu.ru/moodle/login/index.php');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#yui_3_18_1_1_1776589534403_16'),
            targetPage.locator('::-p-xpath(//*[@id=\\"yui_3_18_1_1_1776589534403_16\\"])'),
            targetPage.locator(':scope >>> #yui_3_18_1_1_1776589534403_16')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 1371,
                y: 118,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Логин)'),
            targetPage.locator('#username'),
            targetPage.locator('::-p-xpath(//*[@id=\\"username\\"])'),
            targetPage.locator(':scope >>> #username')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 226.5,
                y: 5.40625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Логин)'),
            targetPage.locator('#username'),
            targetPage.locator('::-p-xpath(//*[@id=\\"username\\"])'),
            targetPage.locator(':scope >>> #username')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 100.5,
                y: 35.40625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Логин)'),
            targetPage.locator('#username'),
            targetPage.locator('::-p-xpath(//*[@id=\\"username\\"])'),
            targetPage.locator(':scope >>> #username')
        ])
            .setTimeout(timeout)
            .fill('aitutor');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Пароль)'),
            targetPage.locator('#password'),
            targetPage.locator('::-p-xpath(//*[@id=\\"password\\"])'),
            targetPage.locator(':scope >>> #password')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 145.5,
                y: 17.15625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Пароль)'),
            targetPage.locator('#password'),
            targetPage.locator('::-p-xpath(//*[@id=\\"password\\"])'),
            targetPage.locator(':scope >>> #password')
        ])
            .setTimeout(timeout)
            .fill('Q6v-95i-76S-9X7');
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Вход)'),
            targetPage.locator('#loginbtn'),
            targetPage.locator('::-p-xpath(//*[@id=\\"loginbtn\\"])'),
            targetPage.locator(':scope >>> #loginbtn'),
            targetPage.locator('::-p-text(Вход)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 36.5,
                y: 37.90625,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Мои курсы)'),
            targetPage.locator('#page-wrapper > nav li:nth-of-type(2) > a'),
            targetPage.locator('::-p-xpath(//*[@id=\\"moremenu-69e49af06d391-navbar-nav\\"]/li[2]/a)'),
            targetPage.locator(':scope >>> #page-wrapper > nav li:nth-of-type(2) > a')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 0.65625,
                y: 13,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Название курса Тестирование)'),
            targetPage.locator('li:nth-of-type(4) div.col-md-9 > a'),
            targetPage.locator('::-p-xpath(//*[@id=\\"page-container-0\\"]/div/ul/li[4]/div/div[2]/a)'),
            targetPage.locator(':scope >>> li:nth-of-type(4) div.col-md-9 > a')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 42.515625,
                y: 10.40625,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('form'),
            targetPage.locator('::-p-xpath(//*[@id=\\"usernavigation\\"]/form)'),
            targetPage.locator(':scope >>> form')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 188.28125,
                y: 38,
              },
            });
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Режим редактирования)'),
            targetPage.locator('#\\36 9e49af4d71f869e49af4cd32e4-editingswitch'),
            targetPage.locator('::-p-xpath(//*[@id=\\"69e49af4d71f869e49af4cd32e4-editingswitch\\"])'),
            targetPage.locator(':scope >>> #\\36 9e49af4d71f869e49af4cd32e4-editingswitch')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 23.46875,
                y: 9.5,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#section-1 div.divider span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"coursecontentcollapseid257\\"]/div[2]/div/button/div/span)'),
            targetPage.locator(':scope >>> #section-1 div.divider span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 14.4375,
                y: 4.59375,
              },
            });
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Тест[role=\\"link\\"])'),
            targetPage.locator('#all-4 div:nth-of-type(31) a'),
            targetPage.locator('::-p-xpath(//*[@id=\\"all-4\\"]/div/div[31]/div/a)'),
            targetPage.locator(':scope >>> #all-4 div:nth-of-type(31) a')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 73.5,
                y: 30.59375,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Имя)'),
            targetPage.locator('#id_name'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_name\\"])'),
            targetPage.locator(':scope >>> #id_name')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 60,
                y: 25.8125,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Alt');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Alt');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Имя)'),
            targetPage.locator('#id_name'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_name\\"])'),
            targetPage.locator(':scope >>> #id_name')
        ])
            .setTimeout(timeout)
            .fill('N');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('n');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Имя)'),
            targetPage.locator('#id_name'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_name\\"])'),
            targetPage.locator(':scope >>> #id_name')
        ])
            .setTimeout(timeout)
            .fill('');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Alt');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Alt');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Имя)'),
            targetPage.locator('#id_name'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_name\\"])'),
            targetPage.locator(':scope >>> #id_name')
        ])
            .setTimeout(timeout)
            .fill('Т');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('т');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Имя)'),
            targetPage.locator('#id_name'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_name\\"])'),
            targetPage.locator(':scope >>> #id_name')
        ])
            .setTimeout(timeout)
            .fill('Тестирование ');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Alt');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Alt');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Имя)'),
            targetPage.locator('#id_name'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_name\\"])'),
            targetPage.locator(':scope >>> #id_name')
        ])
            .setTimeout(timeout)
            .fill('Тестирование {i}');
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('html'),
            frame.locator('::-p-xpath(/html)'),
            frame.locator(':scope >>> html')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 166,
                y: 52,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('::-p-aria(Поле форматированного текста. Нажмите ALT-0, чтобы открыть справку.)'),
            frame.locator('#tinymce'),
            frame.locator('::-p-xpath(//*[@id=\\"tinymce\\"])'),
            frame.locator(':scope >>> #tinymce')
        ])
            .setTimeout(timeout)
            .fill('T');
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await targetPage.keyboard.up('t');
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('::-p-aria(Поле форматированного текста. Нажмите ALT-0, чтобы открыть справку.)'),
            frame.locator('#tinymce'),
            frame.locator('::-p-xpath(//*[@id=\\"tinymce\\"])'),
            frame.locator(':scope >>> #tinymce')
        ])
            .setTimeout(timeout)
            .fill('Test ...');
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Сохранить и показать)'),
            targetPage.locator('#id_submitbutton'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_submitbutton\\"])'),
            targetPage.locator(':scope >>> #id_submitbutton'),
            targetPage.locator('::-p-text(Сохранить и показать)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 28.34375,
                y: 27.21875,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Добавить вопрос)'),
            targetPage.locator('#page-content a'),
            targetPage.locator('::-p-xpath(//*[@id=\\"region-main\\"]/div[2]/div[1]/div/a)'),
            targetPage.locator(':scope >>> #page-content a'),
            targetPage.locator('::-p-text(Добавить вопрос)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 86.5,
                y: 8,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#action-menu-toggle-1 > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"action-menu-toggle-1\\"]/span)'),
            targetPage.locator(':scope >>> #action-menu-toggle-1 > span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 17.75,
                y: 12.515625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(новый вопрос новый вопрос) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('a.addquestion > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"action-menu-1-menu\\"]/a[1]/span)'),
            targetPage.locator(':scope >>> a.addquestion > span'),
            targetPage.locator('::-p-text(новый  вопрос)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 29.78125,
                y: 11.515625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(15) span.typename'),
            targetPage.locator('::-p-xpath(//*[@id=\\"yui_3_18_1_1_1776589590377_615\\"]/div[15]/label/span[2])'),
            targetPage.locator(':scope >>> div:nth-of-type(15) span.typename')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 28.84375,
                y: 5.640625,
              },
            });
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Выберите тип вопроса для добавления[role=\\"dialog\\"]) >>>> ::-p-aria(Добавить)'),
            targetPage.locator('input.submitbutton'),
            targetPage.locator('::-p-xpath(//*[@id=\\"chooserform\\"]/div[3]/input[1])'),
            targetPage.locator(':scope >>> input.submitbutton')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 56.46875,
                y: 11.203125,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Название вопроса)'),
            targetPage.locator('#id_name'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_name\\"])'),
            targetPage.locator(':scope >>> #id_name')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 229.75,
                y: 17.40625,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Alt');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Alt');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Shift');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Название вопроса)'),
            targetPage.locator('#id_name'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_name\\"])'),
            targetPage.locator(':scope >>> #id_name')
        ])
            .setTimeout(timeout)
            .fill('Р');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('р');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Название вопроса)'),
            targetPage.locator('#id_name'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_name\\"])'),
            targetPage.locator(':scope >>> #id_name')
        ])
            .setTimeout(timeout)
            .fill('Решите задание ...');
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('html'),
            frame.locator('::-p-xpath(/html)'),
            frame.locator(':scope >>> html')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 244,
                y: 33,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('::-p-aria(Поле форматированного текста. Нажмите ALT-0, чтобы открыть справку.)'),
            frame.locator('#tinymce'),
            frame.locator('::-p-xpath(//*[@id=\\"tinymce\\"])'),
            frame.locator(':scope >>> #tinymce')
        ])
            .setTimeout(timeout)
            .fill('Р');
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await targetPage.keyboard.up('р');
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('::-p-aria(Поле форматированного текста. Нажмите ALT-0, чтобы открыть справку.)'),
            frame.locator('#tinymce'),
            frame.locator('::-p-xpath(//*[@id=\\"tinymce\\"])'),
            frame.locator(':scope >>> #tinymce')
        ])
            .setTimeout(timeout)
            .fill('Решить пример ...');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Вариант ответа 1[role=\\"textbox\\"])'),
            targetPage.locator('#id_answer_0'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_answer_0\\"])'),
            targetPage.locator(':scope >>> #id_answer_0')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 106.25,
                y: 32.3125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Вариант ответа 1[role=\\"textbox\\"])'),
            targetPage.locator('#id_answer_0'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_answer_0\\"])'),
            targetPage.locator(':scope >>> #id_answer_0')
        ])
            .setTimeout(timeout)
            .fill('123');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Вариант ответа 1[role=\\"group\\"]) >>>> ::-p-aria(Оценка)'),
            targetPage.locator('#id_fraction_0'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_fraction_0\\"])'),
            targetPage.locator(':scope >>> #id_fraction_0')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 46.25,
                y: 32.3125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Вариант ответа 1[role=\\"group\\"]) >>>> ::-p-aria(Оценка)'),
            targetPage.locator('#id_fraction_0'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_fraction_0\\"])'),
            targetPage.locator(':scope >>> #id_fraction_0')
        ])
            .setTimeout(timeout)
            .fill('1.0');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Вариант ответа 2[role=\\"textbox\\"])'),
            targetPage.locator('#id_answer_1'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_answer_1\\"])'),
            targetPage.locator(':scope >>> #id_answer_1')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 93.25,
                y: 9.125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Вариант ответа 2[role=\\"textbox\\"])'),
            targetPage.locator('#id_answer_1'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_answer_1\\"])'),
            targetPage.locator(':scope >>> #id_answer_1')
        ])
            .setTimeout(timeout)
            .fill('12');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Вариант ответа 3[role=\\"textbox\\"])'),
            targetPage.locator('#id_answer_2'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_answer_2\\"])'),
            targetPage.locator(':scope >>> #id_answer_2')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 72.25,
                y: 10.9375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Вариант ответа 3[role=\\"textbox\\"])'),
            targetPage.locator('#id_answer_2'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_answer_2\\"])'),
            targetPage.locator(':scope >>> #id_answer_2')
        ])
            .setTimeout(timeout)
            .fill('32');
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Сохранить)'),
            targetPage.locator('#id_submitbutton'),
            targetPage.locator('::-p-xpath(//*[@id=\\"id_submitbutton\\"])'),
            targetPage.locator(':scope >>> #id_submitbutton')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 53.75,
                y: 6.0625,
              },
            });
        await Promise.all(promises);
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
