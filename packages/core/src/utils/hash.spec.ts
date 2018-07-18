/* tslint:disable:no-magic-numbers */
import { expect } from 'chai'

import { hash } from './hash'

const mock = {
  current_total: null as (number | null),
  current_unit_cost: null as (number | null),
  current_units: null as (number | null),
  id: '59902',
  invoice_id: '890',
  last_touch: null as (string | null),
  lds_activity_code: 'A101',
  lds_adjustment: null as (number | null),
  lds_date: '2015-09-01',
  lds_description: 'Draft initial complaint',
  lds_expense_code: null as (string | null),
  lds_line_id: '2',
  lds_task_code: 'L200',
  lds_timekeeper_class: 'Partner',
  lds_timekeeper_id: '13',
  lds_timekeeper_name: 'Powell, Lewis F.',
  lds_total: 378000,
  lds_type: 'F',
  lds_unit_cost: 60000,
  lds_units: 63,
  lds_vendor_matter_id: 'xyz123',
  matter: null as (object | null),
  mavenCode: { id: '1', custom: '', path: ['generalCode'] },
  tagged_lds_description: null as (string | null),
  timekeeper: null as (object | null),
  vendor: null as (object | null),
}

describe('utils', () => {

  describe('hash(a)', () => {

    it('should be a function', () => {
      expect(hash).to.be.an.instanceof(Function)
    })

    it('should convert any JS value to hash string', () => {
      expect(hash(mock)).to.equal(1823455495)
      expect(hash('Lorem ipsum')).to.equal(1580618281)
      expect(hash(111)).to.equal(48657)
      expect(hash({ hello: 'World!' })).to.equal(1416959369)
    })

  })

})
