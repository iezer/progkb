Expenses.DatePickerField = Em.View.extend
  templateName: 'datepicker'
  didInsertElement: ->
    self = this
    onChangeDate = (ev) ->
      self.set "value", moment.utc(ev.date).format("YYYY-MM-DD")
    @$('.datepicker').datepicker({separator:"-"}).on "changeDate", onChangeDate